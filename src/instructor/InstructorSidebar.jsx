import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const InstructorSidebar = () => {
  return (
    <div className="instructor-sidebar">
      <ListGroup>
        {/* Link to the meetings route */}
        <ListGroup.Item as={Link} to="/instructorDashboard/meetings">
          Meetings
        </ListGroup.Item>
        
        {/* Link to the availability route */}
        <ListGroup.Item as={Link} to="/instructorDashboard/availability">
          Availability
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default InstructorSidebar;
