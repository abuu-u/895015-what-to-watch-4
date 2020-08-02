import React from "react";
import PropTypes from "prop-types";

const RATING = {
  bad: {
    text: `Bad`,
    max: 3,
  },
  normal: {
    text: `Normal`,
    max: 5,
  },
  good: {
    text: `Good`,
    max: 8,
  },
  veryGood: {
    text: `Very good`,
    max: 10,
  },
  awesome: {
    text: `Awesome`,
  },
};

const getRatingLevel = (rating) => {
  let ratingText = ``;

  Object.values(RATING).some((it) => {
    if (it.max > rating) {
      ratingText = it.text;
      return true;
    }

    return false;
  });

  return ratingText;
};

const Overview = (props) => {
  const {
    description,
    rating,
    scoresCount,
    director,
    starring,
  } = props.film;

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingLevel(rating)}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}</strong></p>
      </div>
    </>
  );
};

Overview.propTypes = {
  film: PropTypes.shape({
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default Overview;
