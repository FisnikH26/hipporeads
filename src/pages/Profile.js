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
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const [editProfileDialog, setEditProfileDialog] = useState(false); 

  const { username } = useParams();
  const {
    users,
    setUsers,
    profile,
    setProfile,
    userFollowers,
    booksRead,
    setBooksRead,
    booksReading,
    setBooksReading,
    booksToBeRead,
    setBooksToBeRead,
    DoIFollowThisUser,
    loggedIn,
    setLoggedIn,
    followUser,
    unFollowUser,
    setBookComments,
    bookComments,
    useDocumentTitle
  } = useContext(HippoReadsContext);

  useDocumentTitle(`${username.split('@').join("")} - Profile - HippoReads`)

  const getProfileData = () => {
    //find user 
      let userData = users.find(
        (user) => user.username == username.split("@").join("")
      );
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
      let userBooksRead = booksRead.filter(
        (user) => user.userId == userData.id
      );
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
  const deleteAccount = ()=>{
    const deleteConfirm = window.confirm("Do you really want to delete your account")

    if(deleteConfirm){
      setUsers(users.filter(user=>user.id !== loggedIn.id))
      setProfile(profile.filter(user=>user.userId !== loggedIn.id))
      setBookComments(bookComments.map(u_comments=>u_comments.userId == loggedIn.id ? {...u_comments, userId: null} : u_comments))
      setLoggedIn()
      window.location.replace(`http://localhost:3000/`)
    }
  }
  const btnType = () => {
    if (username.split("@").join("") == loggedIn.username) {
      return (
        <>
          <Button variant="dark" className="btn-sm me-2" onClick={() => setEditProfileDialog(true)}>
            Edit Profile
          </Button>
          <Button variant="outline-danger" className="btn-sm" onClick={deleteAccount}>
            Delete Account
          </Button>
        </>
      );
    }
    if (DoIFollowThisUser(user) == undefined) {
      return (
        <Button
          className="follow-btn btn-sm"
          variant=""
          onClick={() => followUser(user)}
        >
          Follow
        </Button>
      );
    } else {
      return (
        <Button
          className="unfollow-btn secondary-color-border border btn-sm"
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
        booksRead.filter((bookToBeRemoved) => bookToBeRemoved.book.id !== book.id)
      );
      return;
    }
    if (shelfname === "reading") {
      setBooksReading(
        booksReading.filter((bookToBeRemoved) => bookToBeRemoved.book.id !== book.id)
      );
      return;
    }
    if (shelfname === "want to read") {
      setBooksToBeRead(
        booksToBeRead.filter(
          (bookToBeRemoved) => bookToBeRemoved.book.id !== book.book.id
        )
      );
      return;
    }
  };

  const getNewImage = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      setNewProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const editProfileSubmit = (e) => {
    e.preventDefault();

    if (user.biography !== newBio && user.profile_image !== newProfileImage) {
      setProfile(
        profile.map((userP) =>
          userP.userId === loggedIn.id
            ? { ...userP, biography: newBio, profile_image: newProfileImage }
            : userP
        )
      );
    } else if (user.profile_image !== newProfileImage) {
      setProfile(
        profile.map((userPi) =>
          userPi.userId === loggedIn.id
            ? { ...userPi, profile_image: newProfileImage }
            : userPi
        )
      );
    } else if (user.biography !== newBio) {
      setProfile(
        profile.map((userP) =>
          userP.userId === loggedIn.id ? { ...userP, biography: newBio } : userP
        )
      );
    }
    
    if(user.name !== newName && user.username !== newUserName){
      setUsers(
        users.map((user) =>
          user.id === loggedIn.id ? { ...user,name: newName, username: newUserName } : user
        )
      );
      window.location.replace(`http://localhost:3000/@${newUserName}`)
      setLoggedIn({ ...loggedIn, name: newName.trim(),username: newUserName.trim() });
    }else if (user.name !== newName && newName !== "") {
      setUsers(
        users.map((user) =>
          user.id === loggedIn.id ? { ...user, name: newName.trim() } : user
        )
      );
      setLoggedIn({ ...loggedIn, name: newName });
    }else if (user.username !== newUserName && newUserName !== "") {
      setUsers(
        users.map((user) =>
          user.id === loggedIn.id ? { ...user, username: newUserName.trim() } : user
        )
      );
      window.location.replace(`http://localhost:3000/@${newUserName}`)
      setLoggedIn({ ...loggedIn,username: newUserName.trim() });
    }




    setTimeout(() => {
      setEditProfileDialog(false);
      
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      getProfileData();
    }, 500);
  }, [username, booksRead, booksReading, booksToBeRead]);

  useEffect(() => {
    if (editProfileDialog) {
      setNewName(user.name);
      setNewBio(user.biography);
      setNewProfileImage(user.profile_image);
      setNewUserName(user.username);
    }
  }, [editProfileDialog]);

  return (
    <div className="w-75 py-3 ps-5">
      {user && (
        <> 
          {editProfileDialog && (
            <div
              className="position-absolute editProfile_backdrop d-flex align-items-center justify-content-center bg-black bg-opacity-75 w-100 h-100"
              style={{ top: 0, left: 0, zIndex: 20 }}
            >
              <div
                className="editProfile_modal glass rounded p-3"
                style={{ width: "25%" }}
              >
                <h3 className="text-center text-white">Edit Profile</h3>
                <form onSubmit={editProfileSubmit}>
                  <div>
                    <div
                      className="mx-auto rounded-circle overflow-hidden mb-2"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <Image
                        src={
                          newProfileImage == null
                            ? default_img
                            : newProfileImage
                        }
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                    <div className="form-floating ">
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={getNewImage}
                      />
                      <label htmlFor="image">Profile picture</label>
                    </div>
                  </div>
                  <div className="form-floating mt-2">
                    
                    <input
                      type="text"
                      className="form-control"
                      id="user"
                      placeholder="Username"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                    <label htmlFor="name">Username</label>
                        <small className="m-0 px-2 bg-white rounded ">http://localhost:3000/<b>@{newUserName}</b></small>
                  </div>
                  <div className="form-floating mt-2">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="form-floating mt-2">
                    <textarea
                      id="bio"
                      className="form-control"
                      placeholder="Bio"
                      style={{ resize: "none" }}
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                    ></textarea>
                    <label htmlFor="bio">Biography</label>
                  </div>
                  <div className="d-flex gap-3 mt-5">
                    <input
                      type="submit"
                      className={`btn btn-primary text-white w-50 form-control border-0 ${
                        newName == user.name &&
                        newUserName == user.username &&
                        newBio == user.biography &&
                        newProfileImage == user.profile_image
                          ? " disabled"
                          : ""
                      }`}
                    />
                    <Button
                      variant="danger"
                      className="w-50"
                      onClick={() => setEditProfileDialog(!editProfileDialog)}
                    >
                      Close
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div>
            <div className="d-flex align-items-center gap-3 w-75 justify-content-between">
              <Image
                src={
                  user.profile_image == null ? default_img : user.profile_image
                }
                width={150}
                height={150}
                className="rounded-circle border secondary-color-border main-color-bg object-fit-cover"
              />
              <div style={{ flex: 2 }}>
                <h4 className="secondary-color-text m-0">{user.name}</h4>
                <p className="fw-semibold mt-0 main-lighter-text">@{user.username}</p>
                <div className="d-flex gap-3 fw-semibold secondary-color-text pb-1">
                  <div role="button">{user.followers.length} Followers</div>
                  <div>{user.following.length} Followings</div>
                </div>
                {btnType()}
              </div>
            </div>
            <div className="mt-3 mb-5 secondary-color-text">
              {user.biography}
            </div>
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
                      <Col lg={3} key={book.book.id} className="position-relative">
                        <BookCard book={book.book} />
                        {username.split("@").join("") == loggedIn.username && (
                          <Button
                            variant="danger"
                            className="btn-sm rounded-0 rounded-start position-absolute"
                            onClick={() => removeBookFromShelf("read", book.book)}
                            style={{ top: "15px", right: "12px" }}
                          >
                            X
                          </Button>
                        )}
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
                        {username.split("@").join("") == loggedIn.username && (
                          <Button
                            variant="danger"
                            className="btn-sm rounded-0 rounded-start position-absolute"
                            onClick={() => removeBookFromShelf("reading", book)}
                            style={{ top: "15px", right: "12px" }}
                          >
                            X
                          </Button>
                        )}
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
                        {username.split("@").join("") == loggedIn.username && (
                          <Button
                            variant="danger"
                            className="btn-sm rounded-0 rounded-start position-absolute"
                            onClick={() =>
                              removeBookFromShelf("want to read", book)
                            }
                            style={{ top: "15px", right: "12px" }}
                          >
                            X
                          </Button>
                        )}
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
