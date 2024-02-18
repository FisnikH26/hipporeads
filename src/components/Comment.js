import React, { useContext, useEffect, useState } from "react";
import default_image from "../assets/images/OIG1.jpg";
import { Button, Image } from "react-bootstrap";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  const [commenter, setCommenter] = useState([]);
  const { users, profile, loggedIn, setBookComments, bookComments } =
    useContext(HippoReadsContext);

  useEffect(() => {
    if (users.find((user) => user.id === comment.userId)) {
      setCommenter({
        name: users.find((user) => user.id === comment.userId).name,
        username: users.find((user) => user.id === comment.userId).username,
        profile_image: profile.find((user) => user.userId === comment.userId)
          .profile_image,
      });
    } else {
    }
  }, [comment, users, bookComments]);

  return (
    <div className="comment d-flex align-items-center gap-3 mb-3">
      <div>
        <Image
          src={
            commenter.profile_image ? commenter.profile_image : default_image
          }
          width={50}
          height={50}
          className="rounded-circle object-fit-cover"
        />
      </div>
      <div style={{ flex: 2 }}>
        <div className="d-flex gap-3">
          {commenter.name ?
          <Link to={`/@${commenter.username}`} className="text-decoration-none">
            <h6 className="secondary-color-text mb-0">
              {commenter.name }
            </h6>
          </Link>:
          <h6 className="secondary-color-text m-0">
            <i>Deleted Account</i>
          </h6>}
          <span className="main-lighter-text">
            <i>{comment.created_at[0].day}/{comment.created_at[0].month}/
            {comment.created_at[0].year}</i> - <i>{comment.created_at[1].hour +":"+ comment.created_at[1].minutes} </i>
          </span>
        </div>
        <div className="secondary-color-text">
          {comment.commentText.split("\n").map((ct, i) => (
            <p key={i * ct.length} className="m-0 fs-6">
              {ct}
            </p>
          ))}
        </div>
      </div>
      {comment.userId == loggedIn.id && (
        <Button
          variant="danger"
          className="fw-semibold btn-sm py-0"
          onClick={() =>
            setBookComments(bookComments.filter((mc) => mc.id !== comment.id))
          }
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default Comment;
 