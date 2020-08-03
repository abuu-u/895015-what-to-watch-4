import React from "react";
import PropTypes from "prop-types";
import Comment from '../comment/comment.jsx';

const Reviews = (props) => {
  const {comments} = props;

  const rightColumn = comments.slice(0, Math.ceil(comments.length / 2));
  const leftColumn = comments.slice(Math.ceil(comments.length / 2));

  const renderColumn = (array) => {
    return array.map((comment, index) => {
      return <Comment comment={comment} key={index + comment} />;
    });
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {renderColumn(rightColumn)}
      </div>
      <div className="movie-card__reviews-col">
        {renderColumn(leftColumn)}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Reviews;
