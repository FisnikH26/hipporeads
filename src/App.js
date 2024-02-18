import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext, } from "react";
import { HippoReadsContext } from "./assets/context/HippoReadsContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Col, Row } from "react-bootstrap";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import AuthorProfile from "./pages/AuthorProfile"; 
import Navbar from "./components/Navbar";
import Search from "./pages/Search";

function App() {
  const { loggedIn,theme } =
    useContext(HippoReadsContext);
  

  return (
    <BrowserRouter>
      {loggedIn == undefined ? (
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      ) : (
        <div className={`App ${theme}`}>
          <Row className="mx-0 mh100">
            <Col
              lg={2} md={1}
              className="mh100 pt-3 border-end secondary-color-border "
            >
              <Navbar />
            </Col>
            <Col lg={10}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/:username" element={<Profile />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/author/:name" element={<AuthorProfile />} />  
                <Route path="/search/:search" element={<Search />} />  
              </Routes>
            </Col>
          </Row>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
