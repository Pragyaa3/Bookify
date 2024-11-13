import React, { useState } from 'react';
import InstructorList from '../instructor/InstructorList'; // Import the InstructorList component
import "../student/StudentSidebar.css"

const StudentDashboard = () => {
  // State to manage which section is active
  const [activeSection, setActiveSection] = useState('instructorList'); // Default to Instructor List

  // Hardcoded list of meetings for demo purposes
  const meetings = [
    { id: 1, instructor: 'John Doe', date: '2024-11-20', time: '10:00 AM' },
    { id: 2, instructor: 'Jane Smith', date: '2024-11-21', time: '2:00 PM' },
    { id: 3, instructor: 'Bob Johnson', date: '2024-11-22', time: '11:00 AM' },
  ];

  // Function to switch the active section
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => handleSectionChange('instructorList')}>
            Instructor List
          </li>
          <li onClick={() => handleSectionChange('meetings')}>Meetings</li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <h1>Student Dashboard</h1>
        
        {/* Conditionally render content based on active section */}
        {activeSection === 'instructorList' && <InstructorList />}
        
        {activeSection === 'meetings' && (
          <div>
            <h2>Upcoming Meetings</h2>
            <ul>
              {meetings.map((meeting) => (
                <li key={meeting.id}>
                  <p>Instructor: {meeting.instructor}</p>
                  <p>Date: {meeting.date}</p>
                  <p>Time: {meeting.time}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
