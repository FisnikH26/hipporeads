import React, { useContext, useEffect, useState } from "react";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { useParams } from "react-router-dom";
import { todayDate } from "../assets/data/todaydate";
import { v4 as commentId } from "uuid";
import { Button, Col, Image, Row } from "react-bootstrap";
import default_image from "../assets/images/OIG1.jpg"
const BookDetails = () => {
  const { id } = useParams();
  const {
    url_books,
    setLoading,
    recentlyViewedBooks,
    setRecentlyViewedBooks,
    addBookToShelf,
    loggedIn,
    bookComments,
    setBookComments,
    profile,
  } = useContext(HippoReadsContext);
  const [book, setBook] = useState();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const getBook = async () => {
    setLoading(true);
    await fetch(url_books + `/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
        setRecentlyViewedBooks([...recentlyViewedBooks, data]);
      });
  };
  const addComment = () => {
    let userProfile = profile.find((user) => user.userId == loggedIn.id);
    let newComment = {
      id: commentId(),
      book: book.id,
      userId: loggedIn.id,
      commentText: commentText,
      name: loggedIn.name,
      profile_image: userProfile.profile_image,
      created_at: todayDate(),
    };

    setBookComments([...bookComments, newComment]);
    setCommentText("");
  };

  useEffect(() => {
    getBook();
  }, [id]);

  useEffect(() => {
    if (book) {
      setComments(
        bookComments.filter(
          (bookComment) =>
            bookComment.book == book.id && bookComment.userId == loggedIn.id
        )
      );
    }
  }, [book, bookComments]);

  return (
    <>
      {book && (
        <div>
          <Row>
            <Col lg={3}>
              <Image src={book.cover} width="100%" />
              <div className="d-flex gap-1 mt-3">
                <Button className="read-btn main-color-text" variant="" onClick={() => addBookToShelf("read", book)}>
                  Read
                </Button>
                <Button className="reading-btn main-color-text" variant="" onClick={() => addBookToShelf("reading", book)}>
                  Reading
                </Button>
                <Button className="wanttoread-btn main-color-text" variant="" onClick={() => addBookToShelf("want to read", book)}>
                  Want to read
                </Button>
              </div>
            </Col>
            <Col lg={9}>
              <h3>{book.name}</h3>
              {book.author.map((author) => (
                <h5 key={author}>{author}</h5>
              ))}

              <div>
                <ul className="nav flex-column">
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg text-white rounded px-1 me-2">
                      Isbn:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.isbn}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Genre:
                    </span>
                    {book.genre.map((genre) => (
                      <span key={genre} className="fw-semibold secondary-color-text">
                        {book.genre}
                      </span>
                    ))}
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Pages:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.pages}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Language:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.language}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Published:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.published}</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Description:
                    </span>
                    <br />
                    {book.description.includes("\n") ? (
                      book.description.split("\n").map((des) => {
                        <p className="fw-semibold secondary-color-text">{des}</p>;
                      })
                    ) : (
                      <p className="fw-semibold secondary-color-text">{book.description}</p>
                    )}
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="comment mt-5">
            <div className="border-bottom border-2 border-black">
              <h4 className="secondary-color-bg pb-1 px-3 m-0 d-inline-block rounded-top main-color-text">
                Comments ({comments.length})
              </h4>
            </div>
            <div className="writeAComment pt-3">
              <textarea
                className="w-100"
                style={{ resize: "none" }}
                placeholder="Write a comment"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <Button className="secondary-color-bg main-color-text" variant="" onClick={addComment}>
                Comment
              </Button>
            </div>

            <div className="comments pt-5">
              {comments.length !== 0 &&
                comments.map((comment) => {
                  return (
                    <div className="comment d-flex gap-3">
                      <div>
                        <Image
                          src={comment.profile_image ? comment.profile_image  : default_image}
                          width={80}
                          height={80}
                          className="rounded-circle"
                        />
                      </div>
                      <div>
                        <div className="d-flex gap-3">
                          <h5 className="secondary-color-text">{comment.name}</h5>
                          <span className="main-lighter-text">2/2/2024</span>
                        </div>
                        <div className="secondary-color-text">{comment.commentText}</div>
                      </div>
                    </div>
                  );
                }).reverse()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
