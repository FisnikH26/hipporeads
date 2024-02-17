import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import User from "../components/User";
import { Col, Image, Row } from "react-bootstrap";
import default_photo from "../assets/images/hd8ziqoq.png";
import BookCard from "../components/BookCard";
const Search = () => {
  const { search } = useParams();
  const { users, books, authors } = useContext(HippoReadsContext);
  const [searchResult, setSearchResult] = useState([]);
  const [activeTab, setActiveTab] = useState("books");

  useEffect(() => {
    setSearchResult({
      books: books.filter((book) =>
        book.name
          .toLowerCase()
          .includes(search.split("q=").join("").toLowerCase())
      ),
      users: users.filter((user) =>
        user.name
          .toLowerCase()
          .includes(search.split("q=").join("").toLowerCase())
      ),
      authors: authors.filter((authors) =>
        authors.name
          .toLowerCase()
          .includes(search.split("q=").join("").toLowerCase())
      ),
    });
  }, []);
  return (
    <div className="pt-5">
      <div className=" d-flex mx-auto align-items-center mb-3">
        <div
          role="button"
          className={`border fw-semibold text-center py-1 ${activeTab == 'books' ? "text-primary" : ''}`}
          style={{ flex: 1 }}
          onClick={(e) => {
            setActiveTab("books")
            e.target.classList.add("text-primary")
        }}
        >
          Books
        </div>
        <div
          role="button"
          className={`border fw-semibold text-center py-1 ${activeTab == 'users' ? "text-primary" : ''}`}
          onClick={() => setActiveTab("users")}
          style={{ flex: 1 }}
        >
          Users
        </div>
        <div
          role="button"
          className={`border fw-semibold text-center py-1 ${activeTab == 'authors' ? "text-primary" : ''}`}
          onClick={() => setActiveTab("authors")}
          style={{ flex: 1 }}
        >
          Authors
        </div>
      </div>
      <div className="grid_autoFit">
        {activeTab == "users" && (
          <div>
            {searchResult.users && searchResult.users.length ? (
              searchResult.users.map((user) => <User key={user.id} user={user} />)
            ) : (
              <p>No User's name matched the search</p>
            )}
          </div>
        )}
      </div>
      {activeTab == "authors" && (
        <div className="grid_autoFit">
          {searchResult.authors && searchResult.authors.length ? (
            searchResult.authors.map((author) => (
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
            {searchResult.books && searchResult.books.length ? (
              searchResult.books.map((book) => (
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
