import React from "react";
import PropTypes from "prop-types";
import {formatTime} from '../../utils';

const FORMAT = {
  dateTime: `YYYY-MM-DD`,
  date: `MMMM DD, YYYY`,
};

const Comment = (props) => {
  const {
    id,
    user,
    rating,
    comment,
    date,
  } = props.comment;

  return (
    <div
      className="review"
      id={id}
    >
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time
            className="review__date"
            dateTime={formatTime(new Date(date), FORMAT.dateTime)}>
            {formatTime(new Date(date), FORMAT.date)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
