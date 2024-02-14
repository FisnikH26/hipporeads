import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { Link } from "react-router-dom";

const RecentlyView = () => {
  const { recentlyViewedBooks } = useContext(HippoReadsContext);
  return (
    <div>
      <h4 className="secondary-color-text">Recently Viewed</h4>
      <div>
        {recentlyViewedBooks.length == 0
          ? <p className="secondary-color-text"> No book viewed</p>
          : recentlyViewedBooks
              .slice(0, 4)
              .reverse()
              .map((book, i) => {
                return (
                  <div className="d-flex gap-2 mt-1 align-items-center" key={i}>
                    <Link to={`/book/${book.id}`}>
                      <Image src={book.cover} width="70px" height={100} />
                    </Link>
                    <div>
                      <Link
                        to={`/book/${book.id}`}
                        className="text-decoration-none secondary-color-text"
                      >
                        <h5 className=" mb-0">
                          {book.name.length > 20
                            ? book.name.slice(0, 20) + "..."
                            : book.name}
                        </h5>
                      </Link>
                      <div className="d-flex gap-2">
                        {book.author.length > 1 ? (
                          book.author.map((a) => (
                            <Link
                              to={`/author/${a}`}
                              key={a}
                              className="text-decoration-none main-lighter-text  mb-2"
                            >
                              <small>{a},</small>
                            </Link>
                          ))
                        ) : (
                          <Link
                            to={`/author/${book.author}`}
                            className="text-decoration-none main-lighter-text mb-2"
                          >
                            <small>{book.author}</small>
                          </Link>
                        )}
                      </div>
                      {book.genre.map((tag) => (
                        <small
                          key={tag}
                          className="secondary-color-bg main-color-text rounded me-1 py-1 px-2 fw-semibold"
                        >
                          {tag}
                        </small>
                      ))}
                    </div>
                  </div>
                );
              })}
      </div>
    </div>
  );
};

export default RecentlyView;
