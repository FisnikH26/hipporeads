import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import { useContext } from "react";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";

const Explore = () => {
  const [selectSortValue, setSelectSortValue] = useState("sort");
  const [library, setLibrary] = useState([]);
  const [search, setSearch] = useState("");
  const [booksPerPage, setBooksPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, setLoading, setActivePage, books } =
    useContext(HippoReadsContext);
  useEffect(() => {
    setActivePage("Explore");
  });
  // |1 2 3| 4 5
  const getBooks = async () => {
    let url_books = `https://65c5cbb5e5b94dfca2e04e3f.mockapi.io/hipporeads/books?p=${currentPage}&l=${booksPerPage}`;

    if (selectSortValue === "a_z") {
      url_books += `&sortBy=name&order=asc`;
    } else if (selectSortValue === "z_a") {
      url_books += `&sortBy=name&order=desc`;
    }
    if (search !== "") {
      url_books += `&name=${search}`;
    }
    await fetch(url_books)
      .then((res) => res.json())
      .then((data) => {
        setLibrary(data);
      });
  };

  const nextPage = () => {
    if (currentPage >= Math.ceil(books.length / booksPerPage)) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };
  const getPaginationNumbers = () => {
    let nums = [];
    for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
      nums.push(i);
    }

    return nums;
  };
//1 2 3| 4 5|
  const pointersOne = () => {
    let pointer_one = 0;

    if (currentPage > getPaginationNumbers()[pointer_one + 2]) {
      pointer_one += 2;
    }
    return pointer_one;
  };
  const pointerstwo = () => {
    let pointer_two = 3;

    if (currentPage > getPaginationNumbers()[pointer_two -1]) {
      pointer_two += 3;
    }

    return pointer_two;
  };
  const prevPage = () => {
    if (currentPage == 1) {
      setCurrentPage(Math.ceil(books.length / booksPerPage));
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };
  useEffect(() => {
    getBooks(); 
    console.log(pointersOne())
    console.log(pointerstwo())
  }, [selectSortValue, search, currentPage]);
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
                <div className="d-flex justify-content-end gap-2">
                  <Button onClick={() => prevPage()}>
                    <i className="fa-solid fa-arrow-left"></i>
                  </Button>
                  {getPaginationNumbers()
                    .slice(pointersOne(), pointerstwo())
                    .map((num) => (
                      <button
                        key={num}
                        className={`btn ${
                          currentPage == num ? " btn-danger" : "btn-success"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  <Button onClick={() => nextPage()}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Button>
                </div>
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
