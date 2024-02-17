import React, { useContext, useEffect, useState } from "react";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { useParams } from "react-router-dom";
import { todayDate } from "../assets/data/todaydate";
import { v4 as commentId } from "uuid";
import { Button, Col, Image, Row } from "react-bootstrap";
import default_image from "../assets/images/OIG1.jpg"
import Comment from "../components/Comment";
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
    booksRead,
    booksReading,
    booksToBeRead
  } = useContext(HippoReadsContext);
  const [book, setBook] = useState();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const getBook = async () => {
    setLoading(true);
    await fetch(url_books + `/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if(data !== "Not found"){
        setBook(data);
        setRecentlyViewedBooks([...recentlyViewedBooks, data]);
      }
      setLoading(false);
      })
  };
  const addComment = () => {
    let userProfile = profile.find((user) => user.userId == loggedIn.id);
    let newComment = {
      id: commentId(),
      book: book.id,
      userId: loggedIn.id,
      commentText: commentText,
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
            bookComment.book == book.id 
        )
      );
    }
  }, [book, bookComments]);

  return (
    <>
      {book && (
        <div className="pt-3 pb-5">
          <Row>
            <Col lg={3}>
              <Image src={book.cover} width="100%" />
              <div className="d-flex flex-column gap-1 mt-3">
                <Button className="read-btn text-white" variant="" onClick={() => addBookToShelf("read", book)}>
                  Read
                  {booksRead.find(bookread=> bookread.book.id == book.id && bookread.userId == loggedIn.id) && <i className="fa-solid fa-circle-check ms-1"></i>}
                </Button>
                <Button className="reading-btn text-white" variant="" onClick={() => addBookToShelf("reading", book)}>
                  Reading
                  {booksReading.find(bookread=> bookread.book.id == book.id && bookread.userId == loggedIn.id) && <i className="fa-solid fa-circle-check ms-1"></i>}

                </Button>
                <Button className="wanttoread-btn text-white" variant="" onClick={() => addBookToShelf("want to read", book)}>
                  Want to read
                  {booksToBeRead.find(bookread=> bookread.book.id == book.id && bookread.userId == loggedIn.id) && <i className="fa-solid fa-circle-check ms-1"></i>}

                </Button>
              </div>
            </Col>
            <Col lg={9}>
              <h3 className="secondary-color-text">{book.name}</h3>
              {book.author.map((author) =>{ 
                if(book.author.length > 1){
                  return <span className=" fs-5 fw-semibold secondary-color-text" key={author}>{author},</span>
                }
                return <span className=" fs-5 fw-semibold secondary-color-text" key={author}>{author}</span>
              
              
              })}

              <div>
                <ul className="nav flex-column">
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Isbn:
                    </span>
                    <span className="fw-semibold secondary-color-text">{book.isbn ? book.isbn : <i>Not available</i> }</span>
                  </li>
                  <li>
                    <span className="fw-semibold fs-5 secondary-color-bg main-color-text rounded px-1 me-2">
                      Genre:
                    </span>
                    {book.genre.map((genre) => (
                      <span key={genre} className="fw-semibold secondary-color-text">{genre}, </span>
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
                    <i className="fa-solid fa-turn-down secondary-color-text"></i>
                    <br />
                    {book.description.includes("\n") ? (
                      book.description.split("\n").map((des) => {
                        return <p className="fw-semibold secondary-color-text">{des}</p>;
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
                className="w-100 main-color-bg rounded secondary-color-text secondary-color-border border-2 ps-2"
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
                comments.map((comment,i) => {
                  return (
                    <Comment key={i} comment={comment}/>
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
