import React, { useEffect, useState } from "react";
// import Search from "../components/Search";
import { Button, Col, Row } from "react-bootstrap";
// import Sidebar from "../components/Sidebar";
import BookCard from "../components/BookCard";
import { useContext } from "react";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";

const Explore = () => {
  const [selectSortValue, setSelectSortValue] = useState("sort");
  const [library, setLibrary] = useState([]);
  const [search, setSearch] = useState("");
  const { loading, setLoading, setActivePage, books } =
    useContext(HippoReadsContext);
  useEffect(() => {
    setActivePage("Explore");
  });

  const getBooks = async () => {
    let url_books = `https://65c5cbb5e5b94dfca2e04e3f.mockapi.io/hipporeads/books`;

    if (selectSortValue === "a_z") {
      url_books += `?sortBy=name&order=asc`;
    } else if (selectSortValue === "z_a") {
      url_books += `?sortBy=name&order=desc`;
    }
    if (search !== "") {
      if(selectSortValue !== 'sort'){
        url_books += `&name=${search}`;
      }else{
        url_books += `?name=${search}`;
      }
    }

    await fetch(url_books)
      .then((res) => res.json())
      .then((data) => setLibrary(data));
  };

  useEffect(() => {
    getBooks();
  }, [selectSortValue, search]);
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="explore py-3 px-5">
          <Row>
            <Col lg={12} className=" ">
              <div className="d-flex gap-5 w-100 align-items-end">
                <select
                  name="sort"
                  className="border-0 border-bottom secondary-color-text secondary-color-border fw-semibold"
                  style={{
                    width: "70px",
                    background: "var(--background-color)",
                  }}
                  onChange={(e) => setSelectSortValue(e.target.value)}
                >
                  <option value="sort">Sort</option>
                  <option value="a_z">A_z</option>
                  <option value="z_a">Z_A</option>
                </select>
                <div style={{ flex: 2 }}>
                  <div className="search_container position-relative w-50">
                    <input
                      type="search"
                      className="search_input pe-3 rounded-pill border secondary-color-border main-color-bg w-100 ps-3 py-1 "
                      placeholder="Search Book..."
                      onKeyUp={(e) => setSearch(e.target.value)}
                    />
                    <span className="search_icon secondary-color-bg main-color-text rounded-circle">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                  </div>
                </div>
              </div>
              <Row className="mt-5">
                {library &&
                  library.map((book, i) => {
                    return (
                      <Col key={i} xxl={2} lg={3} md={4} sm={6} xs={12}>
                        <BookCard book={book} />
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Explore;
