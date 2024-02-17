import React, { useContext, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { v4 as userId } from "uuid";
import happyHippo from "../assets/images/hippo_walking_into_a_library.jpg";
import { Link } from "react-router-dom";
import { todayDate } from "../assets/data/todaydate";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";

const SignUp = () => {
  const {
    setLoggedIn,
    profile,
    setProfile,
    users,
    setUsers,
    setRecentlyViewedBooks,
  } = useContext(HippoReadsContext);

  const [fullname, setFullname] = useState("");
  const [fullnameErr, setFullnameErr] = useState("");
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const submit_signUp = (e) => {
    e.preventDefault();
    let goodfullname = false,
      goodUsername = false,
      goodEmail = false,
      goodpwd = false;

    if (fullname == "") {
      setFullnameErr("fullname is empty");
    } else if (!(/^[a-zA-Z ]+$/).test(fullname)) {
      setFullnameErr("Only use letters");
    }else {
      setFullnameErr("");
      goodfullname = true;
    }
    
    if (username == "") {
      setUsernameErr("username is empty");
    } else if (!(/^\w+$/).test(username)) {
      setUsernameErr("Only use numbers and letters and underscore");
    }else if(users.find(user=> user.username == username)){
      setUsernameErr("username already taken");
    } else {
      setUsernameErr("");
      goodUsername = true;
    }

    if (email == "") {
      setEmailErr("email is empty");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      setEmailErr("email is invalid");
    } else {
      setEmailErr("");
      goodEmail = true;
    }

    if (password <= 4) {
      setPasswordErr("password is too short");
    } else {
      setPasswordErr("");
      goodpwd = true;
    }

    if (goodfullname && goodUsername && goodEmail && goodpwd) {
      let newUser = {
        id: userId(),
        name: fullname,
        username: username,
        email: email,
        password: password,
        created_at: todayDate(),
      };
      let newUserProfile = {
        id: userId(),
        userId: newUser.id,
        biography: "no Bio Yet", 
        profile_image: null,
      };

      setUsers([...users, newUser]);
      setProfile([...profile, newUserProfile]);
      setLoggedIn(newUser);
      window.location.replace("http://localhost:3000/");
      setRecentlyViewedBooks([]);
    }
  };

  return (
    <div
      className="signUp_container d-flex align-items-center justify-content-center "
      style={{ minHeight: "100dvh" }}
    >
      <Row className="glass w-50 overflow-hidden rounded mx-auto mt-4 p-2">
        <Col lg={6} className="ps-0">
          <Image src={happyHippo} className="w-100 h-100 rounded-start" />
        </Col>
        <Col lg={6}>
          <h3 className="text-center text-white mb-4">Sign up</h3>
          <form className="d-flex flex-column gap-2 mb-2" onSubmit={submit_signUp}>
            <div>
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              {fullnameErr.length !== 0 && (
                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {fullnameErr}
                </b>
              )}
            </div>
            <div>
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr.length !== 0 && (
                <small>

                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {usernameErr}
                </b>
                </small>
              )}
            </div>
            <div>
              <input
                type="email"
                className="form-control mb-1"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr.length !== 0 && (
                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {emailErr}
                </b>
              )}
            </div>
            <div>
              <input
                type="password"
                className="form-control mb-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr.length !== 0 && (
                <b className="m-0 py-0 px-1 rounded bg-danger text-white">
                  {passwordErr}
                </b>
              )}
            </div>
            <div>
              <input
                type="submit"
                className="form-control fw-semibold btn btn-dark text-white border-0"
                value="Sign Up"
              />
            </div>
          </form>

          <small className="text-center text-white">
            Already have an account?
            <Link to="/" className="fw-semibold text-decoration-none bg-white text-dark py-1 ms-2 px-2 rounded">
              Log In
            </Link>
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
