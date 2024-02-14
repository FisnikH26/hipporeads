import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { useParams } from "react-router-dom";
import default_img from "../assets/images/OIG1.jpg";
import no_books from "../assets/images/no-education.png";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("read");
  const [user, setUser] = useState();

  const { name } = useParams();
  const {
    users,
    profile,
    userFollowers,
    booksRead,
    setBooksRead,
    booksReading,
    setBooksReading,
    booksToBeRead,
    setBooksToBeRead,
    DoIFollowThisUser,
    loggedIn,
    followUser,
    unFollowUser,
  } = useContext(HippoReadsContext);
  const getProfileData = () => {
    //find user
    let userData = users.find((user) => user.name == name.split("-").join(" "));
    //find profile
    let userProfileData = profile.find((user) => userData.id == user.userId);
    //followers and following
    let userFollowing = userFollowers.filter(
      (user) => user.userId == userData.id
    );
    let userFollower = userFollowers.filter(
      (user) => user.followerId == userData.id
    );
    //find book in the shelf
    let userBooksRead = booksRead.filter((user) => user.userId == userData.id);
    let userBooksReading = booksReading.filter(
      (user) => user.userId == userData.id
    );
    let userBooksToBeRead = booksToBeRead.filter(
      (user) => user.userId == userData.id
    );
    let profileData = {
      ...userData,
      biography: userProfileData.biography,
      profile_image: userProfileData.profile_image,
      followers: userFollower ? userFollower : [],
      following: userFollowing ? userFollowing : [],
      bookRead: userBooksRead ? userBooksRead : [],
      bookReading: userBooksReading ? userBooksReading : [],
      booksToBeRead: userBooksToBeRead ? userBooksToBeRead : [],
    };
    setUser(profileData);
  };

  const btnType = () => {
    if (name.split("-").join(" ") == loggedIn.name) {
      return <Button variant="dark">Edit Profile</Button>;
    }
    if (DoIFollowThisUser(user) == undefined) {
      return (
        <Button
          className="follow-btn"
          variant=""
          onClick={() => followUser(user)}
        >
          Follow
        </Button>
      );
    } else {
      return (
        <Button
          className="unfollow-btn secondary-color-border border"
          variant=""
          onClick={() => unFollowUser(user)}
        >
          Following
        </Button>
      );
    }
  };

  const removeBookFromShelf = (shelfname, book) => {
    if (shelfname === "read") {
      setBooksRead(
        booksRead.filter((bookToBeRemoved) => bookToBeRemoved.id !== book.id)
      );
      return;
    }
    if (shelfname === "reading") {
      setBooksReading(
        booksReading.filter((bookToBeRemoved) => bookToBeRemoved.id !== book.id)
      );
      return;
    }
    if (shelfname === "want to read") {
      setBooksToBeRead(
        booksToBeRead.filter(
          (bookToBeRemoved) => bookToBeRemoved.id !== book.id
        )
      );
      return;
    }
  };

  useEffect(() => {
    getProfileData();
  }, [name, booksRead,booksReading,booksToBeRead]);

  return (
    <div className="w-75 py-3 ps-5">
      {user && (
        <>
          <div>
            <div className="d-flex align-items-center gap-3 w-75 justify-content-between">
              <Image
                src={
                  user.profile_image == null ? default_img : user.profile_image
                }
                width={150}
                height={150}
                className="rounded-circle"
              />
              <div style={{ flex: 2 }}>
                <h4 className="secondary-color-text">{user.name}</h4>
                <div className="d-flex gap-3 fw-semibold secondary-color-text">
                  <p>{user.followers.length} Followers</p>
                  <p>{user.following.length} Followings</p>
                </div>
              </div>
              {btnType()}
            </div>
            <div className="mt-3 mb-5 secondary-color-text">No bio yet</div>
          </div>
          <div>
            <div className="tabs d-flex">
              <div
                role="button"
                className="fw-semibold w-100 text-center secondary-color-text border py-2 secondary-color-border"
                onClick={() => setActiveTab("read")}
              >
                Read ({user.bookRead.length})
              </div>
              <div
                role="button"
                className="fw-semibold w-100 text-center secondary-color-text border py-2 secondary-color-border"
                onClick={() => setActiveTab("reading")}
              >
                Reading ({user.bookReading.length})
              </div>
              <div
                role="button"
                className="fw-semibold w-100 text-center secondary-color-text border py-2 secondary-color-border"
                onClick={() => setActiveTab("wantToRead")}
              >
                Want to read ({user.booksToBeRead.length})
              </div>
            </div>
            {activeTab == "read" && (
              <div>
                {user.bookRead.length ? (
                  <Row>
                    {user.bookRead.map((book) => (
                      <Col lg={3} key={book.id} className="position-relative">
                        <BookCard book={book.book} />
                        <Button
                          variant="danger"
                          className="btn-sm rounded-0 rounded-start position-absolute"
                          onClick={() => removeBookFromShelf("read", book)}
                          style={{ top: "15px", right: "12px" }}
                        >
                          X
                        </Button>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-5">
                    <Image src={no_books} />
                    <h4 className="mt-2 secondary-color-text">
                      No books in READ section
                    </h4>
                  </div>
                )}
              </div>
            )}
            {activeTab == "reading" && (
              <div>
                {user.bookReading.length ? (
                  <Row>
                    {user.bookReading.map((book) => (
                      <Col lg={3} key={book.id} className="position-relative">
                        <BookCard book={book.book} />
                        <Button
                          variant="danger"
                          className="btn-sm rounded-0 rounded-start position-absolute"
                          onClick={() => removeBookFromShelf("reading", book)}
                          style={{ top: "15px", right: "12px" }}
                        >
                          X
                        </Button>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-5">
                    <Image src={no_books} />
                    <h4 className="mt-2 secondary-color-text">
                      No books in READING section
                    </h4>
                  </div>
                )}
              </div>
            )}
            {activeTab == "wantToRead" && (
              <div>
                {user.booksToBeRead.length ? (
                  <Row>
                    {user.booksToBeRead.map((book) => (
                      <Col lg={3} key={book.id} className="position-relative">
                        <BookCard book={book.book} />
                        <Button
                          variant="danger"
                          className="btn-sm rounded-0 rounded-start position-absolute"
                          onClick={() => removeBookFromShelf("want to read", book)}
                          style={{ top: "15px", right: "12px" }}
                        >
                          X
                        </Button>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-5">
                    <Image src={no_books} />
                    <h4 className="mt-2 secondary-color-text">
                      No books in WANT TO READ section
                    </h4>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
