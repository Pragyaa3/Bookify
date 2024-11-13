import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { db } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import DatePicker from "react-datepicker"; // Importing DatePicker component
import "react-datepicker/dist/react-datepicker.css";
import { Timestamp } from "firebase/firestore"; // Import Timestamp

const InstructorAvailability = () => {
  const auth = getAuth();
  const [instructorId, setInstructorId] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Fetch the current instructor ID using onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInstructorId(user.uid);
        console.log("Instructor ID:", user.uid);
      } else {
        console.warn("User is not logged in.");
        setInstructorId(null);
      }
    });

    // Cleanup the listener
    return () => unsubscribe();
  }, [auth]);

  // Fetch availability data from Firestore
  const fetchAvailability = async () => {
    if (!instructorId) return;

    try {
      const q = query(collection(db, "availabilities"), where("instructorId", "==", instructorId));
      const querySnapshot = await getDocs(q);
      const fetchedAvailabilities = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Convert timestamp to Date object if it exists
        if (data.date instanceof Timestamp) {
          data.date = data.date.toDate().toLocaleDateString();
        }
        return data;
      });
      setAvailabilities(fetchedAvailabilities);
      console.log("Fetched Availabilities:", fetchedAvailabilities);
    } catch (error) {
      console.error("Error fetching availability:", error);
      alert(`Failed to fetch availability: ${error.message}`);
    }
  };

  useEffect(() => {
    if (instructorId) {
      fetchAvailability();
    }
  }, [instructorId]);

  // Function to handle setting availability
  const handleSetAvailability = async () => {
    if (!instructorId) {
      alert("Instructor ID is missing. Please ensure you are logged in.");
      return;
    }

    if (!day || !startTime || !endTime) {
      alert("All fields are required.");
      return;
    }

    const newAvailability = {
      instructorId,
      day,
      startTime,
      endTime,
    };

    console.log("Data to be saved:", newAvailability);

    try {
      await addDoc(collection(db, "availabilities"), newAvailability);
      alert("Availability set successfully!");
      setShowModal(false);
      fetchAvailability(); // Refresh availability list
    } catch (error) {
      console.error("Error setting availability:", error);
      alert(`Failed to set availability: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Your Availability</h3>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Set Availability
      </Button>

      <ul className="mt-3">
        {availabilities.length > 0 ? (
          availabilities.map((availability, index) => (
            <li key={index}>
              {availability.date}: {availability.startTime} - {availability.endTime}
            </li>
          ))
        ) : (
          <p>No availability set yet.</p>
        )}
      </ul>

      {/* Modal for Setting Availability */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="date">
              <Form.Label>Select Date</Form.Label>
              {/* Use the DatePicker component */}
              <DatePicker
                selected={day}
                onChange={(date) => setDay(date)}
                dateFormat="yyyy-MM-dd" // Format the date
                minDate={new Date()} // Disable past dates
                className="form-control"
                placeholderText="Select a date"
              />
            </Form.Group>

            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSetAvailability}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InstructorAvailability;
