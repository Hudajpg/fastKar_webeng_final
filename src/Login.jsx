import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from 'react-bootstrap';
import React from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");


  const loginWithUsernameAndPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      setNotice("Wrong username or password.");
    }
  }

  return (
    <div className="bg-secondary d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-4 mt-3 pt-3 pb-3">
        {notice !== "" && <div className="alert alert-warning" role="alert">{notice}</div>}
        <div className="text-center mb-4">
          <img src="carLogo-1.png" alt="Logo" className="img-fluid" />
        </div>
        <Form className="d-flex flex-column align-items-center">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control type="email" placeholder="EMAIL" value={email}
              onChange={(e) => setEmail(e.target.value)} className="border border-light text-light"
              style={{ backgroundColor: "transparent", width: "300px", height: "45px", color: "#ffffff", fontFamily: "Advent Pro" }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control type="password" placeholder="PASSWORD" value={password}
              onChange={(e) => setPassword(e.target.value)} className="border border-light text-light"
              style={{ backgroundColor: "transparent", width: "300px", height: "45px", color: "#ffffff", fontFamily: "Advent Pro" }} />
          </Form.Group>
          <div className="mt-3 text-center">
            <span>New? <Link to="./signup" className="text-info">Sign Up</Link></span>
          </div>
          <div className="d-grid">
            <Button variant="info" type="submit" className="pt-3 pb-3"
              onClick={(e) => loginWithUsernameAndPassword(e)}
              style={{ width: "300px", height: "45px", fontFamily: "Advent Pro", color: "#ffffff" }}>
              LOGIN
            </Button>
            <div className="mt-2 text-end">
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;