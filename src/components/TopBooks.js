import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BookCard from "./BookCard";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
const TopBooks = () => {
  const [topBooks, setTopbooks] = useState([]);
  const { url_books,loading, setLoading } = useContext(HippoReadsContext);

  const getTopBooks = async () => {
    setLoading(true);
    await fetch(url_books + "?sortBy=rating&order=desc")
      .then((res) => res.json())
      .then((data) => {
        setTopbooks(data);
        setLoading(false);
      });
  };
useEffect(()=>{
  getTopBooks()
})
  return (
    <section className="py-3">
      {loading ? (
        "Loading"
      ) : (
        <Row className="">
          <h3 className="secondary-color-text">Top Books</h3>
          {topBooks &&
            topBooks 
              .slice(0, 4)
              .map((book) => {
                return (
                  <Col lg={3} key={book.id}>
                    <BookCard book={book} />
                  </Col>
                );
              })}
        </Row>
      )}
    </section>
  );
};

export default TopBooks;
