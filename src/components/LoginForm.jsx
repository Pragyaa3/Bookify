import React, { useState } from 'react';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider,db } from "../lib/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [role, setRole] = useState('student');  // Default role is "student"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);

      // Store user data in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { email, role });
      console.log('User data saved to Firestore');

      // Redirect based on role
      if (role === 'student') {
        window.location.href = "/studentDashboard";
      } else if (role === 'instructor') {
        window.location.href = "/instructorDashboard";
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google Sign-In successful!');
      navigate('/studentDashboard'); // Or navigate based on user role
    } catch (error) {
      console.error('Google Sign-In failed:', error.message);
      alert('Google Sign-In failed. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Role selection with radio buttons */}
        <Form.Group className="mb-3">
          <Form.Label>Select Role</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Student"
              value="student"
              checked={role === 'student'}
              onChange={handleRoleChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Instructor"
              value="instructor"
              checked={role === 'instructor'}
              onChange={handleRoleChange}
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      {/* Google Sign-In Button */}
      <Button variant="danger" onClick={handleGoogleSignIn} className="mt-3">
        Sign in with Google
      </Button>

    </div>


  );
}

export default LoginForm;
