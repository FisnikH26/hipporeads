import React, { useContext, useEffect, useState } from "react";
import default_image from "../assets/images/OIG1.jpg";
import { Button, Image } from "react-bootstrap";
import { HippoReadsContext } from "../assets/context/HippoReadsContext";

const Comment = ({ comment }) => {
  const [commenter, setCommenter] = useState([]);
  const { users, profile, loggedIn, setBookComments, bookComments } =
    useContext(HippoReadsContext);

  useEffect(() => {
    setCommenter({
      name: users.find((user) => user.id === comment.userId).name,
      profile_image: profile.find((user) => user.userId === comment.userId)
        .profile_image,
    });
  }, [comment]);

  return (
    <div className="comment d-flex align-items-center gap-3">
      <div>
        <Image
          src={
            commenter.profile_image ? commenter.profile_image : default_image
          }
          width={80}
          height={80}
          className="rounded-circle"
        />
      </div>
      <div style={{ flex: 2 }}>
        <div className="d-flex gap-3">
          <h5 className="secondary-color-text">{commenter.name}</h5>
          <span className="main-lighter-text">2/2/2024</span>
        </div>
        <div className="secondary-color-text">
          {comment.commentText.split("\n").map((ct, i) => (
            <p key={i * ct.length} className="m-0">
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
