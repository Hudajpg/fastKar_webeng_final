import React, { useState } from "react";
import { auth, firestore } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Form, Button } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");

  const signupWithUsernameAndPassword = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const userDocRef = doc(firestore, "users", user.uid);
        const userData = {
          name: name,
          email: email,
          role: "user",
        };
        await setDoc(userDocRef, userData);
        navigate("/");
      } catch {
        setNotice("Something went wrong (password may be invalid) ");
      }
    } else {
      setNotice("Passwords don't match. Please try again.");
    }
  };

  return (
    <div className="bg-secondary d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-4 mt-3 pt-3 pb-3">
        {notice !== "" && <div className="alert alert-warning" role="alert">{notice}</div>}
        <div className="text-center mb-4">
        <img src="carLogo-1.png" alt="Logo" className="img-fluid" />
        </div>
        <Form className="d-flex flex-column align-items-center">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-light text-light"
              style={{
                backgroundColor: "transparent",
                width: "300px",
                height: "45px",
                color: "#ffffff",
                fontFamily: "Advent Pro"
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-light text-light"
              style={{
                backgroundColor: "transparent",
                width: "300px",
                height: "45px",
                color: "#ffffff",
                fontFamily: "Advent Pro"
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-light text-light"
              style={{
                backgroundColor: "transparent",
                width: "300px",
                height: "45px",
                color: "#ffffff",
                fontFamily: "Advent Pro"
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Control
              type="password"
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-light text-light"
              style={{
                backgroundColor: "transparent",
                width: "300px",
                height: "45px",
                color: "#ffffff",
                fontFamily: "Advent Pro"
              }}
            />
          </Form.Group>
          <div className="d-grid">
            <Button
              variant="info"
              type="submit"
              className="pt-3 pb-3"
              onClick={(e) => signupWithUsernameAndPassword(e)}
              style={{
                width: "300px",
                height: "45px",
                fontFamily: "Advent Pro",
                color: "#ffffff"
              }}
            >
              SIGNUP
            </Button>
          </div>
          <div className="mt-3 text-center">
            <span>Already have an account? <Link to="/" className="text-info">LOGIN</Link></span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;