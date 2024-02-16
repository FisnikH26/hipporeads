import React, { useContext, useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import happyHippo from "../assets/images/hd8ziqoq.png";
import { Link } from "react-router-dom";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const { setLoggedIn,users,setRecentlyViewedBooks } = useContext(HippoReadsContext);

  const loginForm = (e) => {
    e.preventDefault();
    let goodEmail = false
    let goodpwd = false
    
    if ((email.length == 0)) {
      setEmailErr("Email is empty");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailErr("Email is invalid");
    } else {
      setEmailErr("");
      goodEmail = true
    }
    if (password.length <= 4) {
      setPasswordErr("password is too short");
    }else if (users.find(user=> user.email == email && user.password == password) == undefined) {
      setPasswordErr("password is wrong");
      
    }else{
      setPasswordErr("");
      goodpwd = true
    }

    if (goodEmail && goodpwd) {
        let userFound = users.find(user=> user.email == email && user.password == password)
        setLoggedIn(userFound)
      window.location.replace('http://localhost:3000/')
      setRecentlyViewedBooks([])


      console.log({ email: email, password: password });
    }
  };

  useEffect(() => {});

  return (
    <div
      className="login_container d-flex align-items-center justify-content-center "
      style={{ minHeight: "100dvh" }}
    >
      <Row className="w-50  rounded mx-auto mt-5 overflow-hidden">
        <Col lg={6} className="ps-0">
          <Image src={happyHippo} width="100%" />
        </Col>
        <Col lg={6}>
          <h3 className="text-center text-white mb-5">Log In</h3>
          <form className="d-flex flex-column gap-4 mb-2" onSubmit={loginForm}>
            <div>
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr && <b className="text-danger">{emailErr}</b>}
            </div>
            <div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr && <b className="text-danger">{passwordErr}</b>}

            </div>
            <div>
              <input
                type="submit"
                className="form-control btn btn-dark text-white border-0"
                value="Log In"
              />
            </div>
          </form>

          <small className="text-center text-white">
            Don't have an account ?
            <Link to="/signup" className="fw-semibold text-decoration-none bg-white text-dark py-1 ms-2 px-2 rounded">
              Sign Up
            </Link>
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
