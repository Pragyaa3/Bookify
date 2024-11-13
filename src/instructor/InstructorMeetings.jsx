import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { db } from "../lib/firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const InstructorMeetings = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const instructorId = user ? user.uid : null;

  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");

  // Fetch meetings data from Firestore
  const fetchMeetings = async () => {
    if (!instructorId) return; // Ensure instructorId is available

    const q = query(collection(db, "meetings"), where("instructorId", "==", instructorId));
    const querySnapshot = await getDocs(q);
    const fetchedMeetings = querySnapshot.docs.map((doc) => doc.data());
    setMeetings(fetchedMeetings);
  };

  useEffect(() => {
    if (instructorId) {
      fetchMeetings();
    }
  }, [instructorId]); // Trigger re-fetch when instructorId changes

  const handleCreateMeeting = async () => {
    if (!eventName || !duration || !location) {
      alert("All fields are required.");
      return;
    }

    const newMeeting = {
      instructorId,
      eventName,
      duration,
      location,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "meetings"), newMeeting);
      alert("Meeting created successfully!");
      setShowModal(false);
      fetchMeetings(); // Refresh meetings list
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert(`Failed to create meeting: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Upcoming Meetings</h3>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Create Meeting
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Duration</th>
            <th>Location</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting, index) => (
            <tr key={index}>
              <td>{meeting.eventName}</td>
              <td>{meeting.duration}</td>
              <td>{meeting.location}</td>
              <td>{new Date(meeting.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Creating Meeting */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="duration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duration (e.g., 30 mins)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Meet">Meet</option>
                <option value="Call">Call</option>
                <option value="In-Person">In-Person</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateMeeting}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InstructorMeetings;
