import React from "react";
import './InstructorList.css';

const instructors = [
    {
      id: 1,
      profilePic: "https://example.com/john.jpg",
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Experienced Guitarist with 10 years of teaching.",
      specialization: "Guitar",
      experience: "10 years",
      location: "New York",
      price: "$30/hour",
      availableTimes: ["Monday 10:00 AM - 12:00 PM", "Wednesday 2:00 PM - 4:00 PM"],
    },
    {
      id: 2,
      profilePic: "https://example.com/jane.jpg",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      bio: "Professional Painter, specializing in watercolors.",
      specialization: "Painting",
      experience: "8 years",
      location: "Los Angeles",
      price: "$40/hour",
      availableTimes: ["Tuesday 1:00 PM - 3:00 PM", "Thursday 3:00 PM - 5:00 PM"],
    },
    {
      id: 3,
      profilePic: "https://example.com/mark.jpg",
      name: "Mark Johnson",
      email: "mark.johnson@example.com",
      bio: "Passionate Piano teacher with a background in classical music.",
      specialization: "Piano",
      experience: "6 years",
      location: "Chicago",
      price: "$50/hour",
      availableTimes: ["Monday 3:00 PM - 5:00 PM", "Friday 10:00 AM - 12:00 PM"],
    },
    {
      id: 4,
      profilePic: "https://example.com/susan.jpg",
      name: "Susan Lee",
      email: "susan.lee@example.com",
      bio: "Yoga Instructor with over 15 years of experience.",
      specialization: "Yoga",
      experience: "15 years",
      location: "San Francisco",
      price: "$20/hour",
      availableTimes: ["Monday 8:00 AM - 10:00 AM", "Saturday 2:00 PM - 4:00 PM"],
    },
    {
      id: 5,
      profilePic: "https://example.com/david.jpg",
      name: "David Brown",
      email: "david.brown@example.com",
      bio: "Experienced violinist with a focus on classical music.",
      specialization: "Violin",
      experience: "12 years",
      location: "Boston",
      price: "$60/hour",
      availableTimes: ["Tuesday 4:00 PM - 6:00 PM", "Thursday 1:00 PM - 3:00 PM"],
    },
    {
      id: 6,
      profilePic: "https://example.com/lisa.jpg",
      name: "Lisa Green",
      email: "lisa.green@example.com",
      bio: "Certified Dance Instructor specializing in contemporary dance.",
      specialization: "Dance",
      experience: "9 years",
      location: "Miami",
      price: "$35/hour",
      availableTimes: ["Wednesday 11:00 AM - 1:00 PM", "Friday 4:00 PM - 6:00 PM"],
    },
    {
      id: 7,
      profilePic: "https://example.com/tony.jpg",
      name: "Tony Harris",
      email: "tony.harris@example.com",
      bio: "Experienced Drummer with a background in jazz and rock.",
      specialization: "Drums",
      experience: "10 years",
      location: "Seattle",
      price: "$45/hour",
      availableTimes: ["Tuesday 2:00 PM - 4:00 PM", "Saturday 1:00 PM - 3:00 PM"],
    },
    {
      id: 8,
      profilePic: "https://example.com/anna.jpg",
      name: "Anna White",
      email: "anna.white@example.com",
      bio: "Creative Writing instructor with a passion for storytelling.",
      specialization: "Creative Writing",
      experience: "7 years",
      location: "Austin",
      price: "$25/hour",
      availableTimes: ["Monday 9:00 AM - 11:00 AM", "Wednesday 1:00 PM - 3:00 PM"],
    },
    {
      id: 9,
      profilePic: "https://example.com/paul.jpg",
      name: "Paul Turner",
      email: "paul.turner@example.com",
      bio: "Skilled in teaching various types of martial arts.",
      specialization: "Martial Arts",
      experience: "12 years",
      location: "Denver",
      price: "$50/hour",
      availableTimes: ["Monday 4:00 PM - 6:00 PM", "Thursday 10:00 AM - 12:00 PM"],
    },
    {
      id: 10,
      profilePic: "https://example.com/olivia.jpg",
      name: "Olivia Scott",
      email: "olivia.scott@example.com",
      bio: "Certified Photographer with a special focus on nature photography.",
      specialization: "Photography",
      experience: "8 years",
      location: "Phoenix",
      price: "$55/hour",
      availableTimes: ["Tuesday 3:00 PM - 5:00 PM", "Friday 10:00 AM - 12:00 PM"],
    },
    {
      id: 11,
      profilePic: "https://example.com/ryan.jpg",
      name: "Ryan Adams",
      email: "ryan.adams@example.com",
      bio: "Film Editing professional, skilled in editing for documentary films.",
      specialization: "Film Editing",
      experience: "5 years",
      location: "New York",
      price: "$70/hour",
      availableTimes: ["Monday 2:00 PM - 4:00 PM", "Thursday 12:00 PM - 2:00 PM"],
    },
    {
      id: 12,
      profilePic: "https://example.com/nina.jpg",
      name: "Nina Clark",
      email: "nina.clark@example.com",
      bio: "Flute instructor with a focus on classical and modern music.",
      specialization: "Flute",
      experience: "11 years",
      location: "Los Angeles",
      price: "$65/hour",
      availableTimes: ["Wednesday 10:00 AM - 12:00 PM", "Saturday 3:00 PM - 5:00 PM"],
    },
    {
      id: 13,
      profilePic: "https://example.com/emily.jpg",
      name: "Emily Turner",
      email: "emily.turner@example.com",
      bio: "Experienced Chess teacher with a background in competitive chess.",
      specialization: "Chess",
      experience: "9 years",
      location: "Chicago",
      price: "$30/hour",
      availableTimes: ["Tuesday 4:00 PM - 6:00 PM", "Friday 1:00 PM - 3:00 PM"],
    },
    {
      id: 14,
      profilePic: "https://example.com/kevin.jpg",
      name: "Kevin Walker",
      email: "kevin.walker@example.com",
      bio: "Experienced Swimming Coach with 15 years of experience.",
      specialization: "Swimming",
      experience: "15 years",
      location: "Miami",
      price: "$40/hour",
      availableTimes: ["Monday 8:00 AM - 10:00 AM", "Thursday 3:00 PM - 5:00 PM"],
    },
    {
      id: 15,
      profilePic: "https://example.com/sophia.jpg",
      name: "Sophia King",
      email: "sophia.king@example.com",
      bio: "Voice coach with a background in opera and contemporary music.",
      specialization: "Voice",
      experience: "13 years",
      location: "San Francisco",
      price: "$60/hour",
      availableTimes: ["Tuesday 9:00 AM - 11:00 AM", "Friday 2:00 PM - 4:00 PM"],
    }
  ];
  

  const InstructorList = () => {
    return (
      <div className="instructor-list">
        <h2>Our Instructors</h2>
        <div className="instructor-cards">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="instructor-card">
              <img
                src={instructor.profilePic}
                alt={instructor.name}
                className="instructor-profile-pic"
              />
              <h3>{instructor.name}</h3>
              <p><strong>Specialization:</strong> {instructor.specialization}</p>
              <p><strong>Experience:</strong> {instructor.experience}</p>
              <p><strong>Location:</strong> {instructor.location}</p>
              <p><strong>Price:</strong> {instructor.price}</p>
              <p><strong>Available Times:</strong></p>
              <ul>
                {instructor.availableTimes.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
              <button>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default InstructorList;