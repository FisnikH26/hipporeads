import React, { useContext, useEffect, useState } from "react";
import User from "./User";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { Image, Row } from "react-bootstrap";
import default_photo from "../assets/images/OIG1.jpg";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [userSuggestion, setUserSuggestion] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { users,loggedIn, DoIFollowThisUser,shuffle, profile,searchBookResult,
    searchUserResult,
    searchAuthorsResult ,searchResults} =
    useContext(HippoReadsContext);
 

  useEffect(() => {
    setUserSuggestion(
      shuffle(users.filter(
        (user) =>
          user.id !== loggedIn.id && DoIFollowThisUser(user) == undefined
      ))
    );
  }, []);
  useEffect(() => {
    if (searchTerm.length != 0) {
      searchResults(searchTerm);
    }
  }, [searchTerm]);
  const handlesearch=(e)=>{
    e.preventDefault();
    
    if(searchTerm != "")
    {
      window.location.replace(`http://localhost:3000/search/q=${searchTerm}`)
    }
  }
  return (
    <div className="pt-3">
      <div className="position-relative">
        <h6>Quick Search</h6>
        <form onSubmit={handlesearch}>
          <input
            type="search"
            className="form-control rounded-pill secondary-color-border secondary-color-text main-color-bg"
            placeholder="Search"
            onKeyUp={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        {searchTerm.length != 0 && (
          <div className="search_result position-absolute bg-white w-100 p-2 text-secondary border">
            <div>
            <small className="fw-bold">BOOKS</small>
              {searchBookResult.slice(0, 4).map((book) => (
                <Link
                  to={`/book/${book.id}`}
                  key={book.id}
                  className="text-decoration-none secondary-color-text"
                >
                  <div className="d-flex align-items-center gap-1 mb-1">
                    <Image src={book.cover} width={40} height={50} />
                    <h6>
                      {book.name.length >= 20
                        ? book.name.slice(0, 20) + "..."
                        : book.name}
                    </h6>
                  </div>
                </Link>
              ))}
            </div>
            <div>
              <small className="fw-bold">AUTHORS</small>
              {searchAuthorsResult.slice(0, 4).map((author) => (
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
              ))}
            </div>
            <div>
              <small className="fw-bold">USERS</small>
              {searchUserResult.slice(0, 4).map((user) => {
                let userP = profile.find((up) => up.userId == user.id);
                return (
                  <Link
                    to={`/profile/@${user.username}`}
                    key={user.id}
                    className="text-decoration-none secondary-color-text"
                  >
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Image
                        src={
                          userP.profile_image
                            ? userP.profile_image
                            : default_photo
                        }
                        width={50}
                        height={50}
                        className="rounded-circle"
                      />
                      <div className="">
                        <h6 className="mb-0">
                          {user.name.length >= 20
                            ? user.name.slice(0, 20) + "..."
                            : user.name}
                        </h6>
                        <p className="mb-0 fw-semibold text-secondary">
                          @
                          {user.username.length >= 20
                            ? user.username.slice(0, 20) + "..."
                            : user.username}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <small className="fw-semibold">Suggestion for you</small>
        {userSuggestion.length ? (
          userSuggestion
            .slice(0, 3)
            .map((user_s) => <User key={user_s.id} user={user_s} />)
        ) : (
          <b className="d-block text-center">No Suggestions</b>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
