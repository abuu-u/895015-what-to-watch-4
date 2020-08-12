import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {connect} from "react-redux";
import {getFilmById} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

const COMMENT = {
  min: 50,
  max: 400,
};

const AddReview = (props) => {
  const {
    activeFilm,
    errorText,
    isSubmitDisabled,
    isFormDisabled,
    onChange,
    onFormSubmit,
  } = props;

  if (!activeFilm) {
    return `Loading`;
  }

  const {
    backgroundImage,
    posterImage,
    name,
  } = activeFilm;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={`${AppRoute.FILMS}${activeFilm.id}`}
                  href="movie-page.html"
                  className="breadcrumbs__link"
                >{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          disabled={isFormDisabled}
          onChange={(evt) => {
            const formData = new FormData(evt.currentTarget);
            const comment = formData.get(`review-text`);
            const rating = formData.get(`rating`);

            onChange({rating, comment});
          }}
          onSubmit={(evt) => {
            const formData = new FormData(evt.currentTarget);
            const comment = formData.get(`review-text`);
            const rating = formData.get(`rating`);

            evt.preventDefault();
            onFormSubmit({rating, comment}, activeFilm.id);
          }}
        >
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>
          {errorText.length
            ? errorText
            : ``}
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text" id="review-text"
              placeholder="Review text"
              minLength={COMMENT.min}
              maxLength={COMMENT.max}
            ></textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={isSubmitDisabled}
              >Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
};


AddReview.propTypes = {
  activeFilm: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }).isRequired,
  errorText: PropTypes.string.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  activeFilm: getFilmById(state, props.id),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(comment, filmId) {
    dispatch(DataOperation.submitComment(comment, filmId));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
