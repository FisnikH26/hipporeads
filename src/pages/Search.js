import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import User from "../components/User";
import { Col, Image, Row } from "react-bootstrap";
import default_photo from "../assets/images/OIG1.jpg";
import BookCard from "../components/BookCard";
const Search = () => {
  const { search } = useParams();
  const {
    searchBookResult,
    searchUserResult,
    searchAuthorsResult,
    searchResults,
  } = useContext(HippoReadsContext);
  const [activeTab, setActiveTab] = useState("books");

  useEffect(() => {
      searchResults(search.split("q=").join(""));
  }, [search, searchBookResult, searchUserResult, searchAuthorsResult]);
  return (
    <div className="pt-5">
      <b>Search results for : {search.split("q=").join("")}</b>
      <div className=" d-flex mx-auto align-items-center mb-3">
        <div
          role="button"
          className={`border secondary-color-border fw-semibold text-center py-1 ${
            activeTab === "books" ? "text-primary" : ""
          }`}
          style={{ flex: 1 }}
          onClick={(e) => {
            setActiveTab("books");
            e.target.classList.add("text-primary");
          }}
        >
          Books ({searchBookResult.length})
        </div>
        <div
          role="button"
          className={`border secondary-color-border fw-semibold text-center py-1 ${
            activeTab === "users" ? "text-primary" : ""
          }`}
          onClick={() => setActiveTab("users")}
          style={{ flex: 1 }}
        >
          Users ({searchUserResult.length})
        </div>
        <div
          role="button"
          className={`border secondary-color-border fw-semibold text-center py-1 ${
            activeTab === "authors" ? "text-primary" : ""
          }`}
          onClick={() => setActiveTab("authors")}
          style={{ flex: 1 }}
        >
          Authors ({searchAuthorsResult.length})
        </div>
      </div>
      <div className="grid_autoFit">
        {activeTab == "users" && (
          <div>
            {searchUserResult.length ? (
              searchUserResult.map((user) => <User key={user.id} user={user} />)
            ) : (
              <p>No User's name matched the search</p>
            )}
          </div>
        )}
      </div>
      {activeTab == "authors" && (
        <div className="grid_autoFit">
          {searchAuthorsResult.length ? (
            searchAuthorsResult.map((author) => (
              <Link
                to={`/author/${author.name}`}
                key={author.id}
                className="text-decoration-none secondary-color-text"
              >
                <div className="d-flex align-items-center gap-1 mb-1">
                  <Image
                    src={author.image == null ? default_photo : author.image}
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                  <h6>
                    {author.name.length >= 20
                      ? author.name.slice(0, 20) + "..."
                      : author.name}
                  </h6>
                </div>
              </Link>
            ))
          ) : (
            <p>No Authors's name matched the search</p>
          )}
        </div>
      )}
      {activeTab == "books" && (
        <div>
          <Row>
            {searchBookResult.length ? (
              searchBookResult.map((book) => (
                <Col lg={2} key={book.id}>
                  <BookCard book={book} />
                </Col>
              ))
            ) : (
              <p>No Book's title matched the search</p>
            )}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Search;
