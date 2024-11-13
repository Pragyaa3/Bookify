import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SigupForm';
import StudentDashboard from './components/StudentDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import InstructorMeetings from './instructor/InstructorMeetings';
import AvailabilityForm from './instructor/AvailabilityForm';

function App() {
  return (
    <Router>
      {/* Include the Navbar on the home page */}
      <NavBar />

      {/* Define the routes for the application */}
      <Routes>
        <Route path="/" element={<h1>Welcome to the Home Page!</h1>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        
        <Route path="/studentDashboard" element={<StudentDashboard />} />

         {/* Instructor Routes */}
         <Route path="instructorDashboard" element={<InstructorDashboard />}>
          <Route path="availability" element={<AvailabilityForm />} />
          <Route path="meetings" element={<InstructorMeetings />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
