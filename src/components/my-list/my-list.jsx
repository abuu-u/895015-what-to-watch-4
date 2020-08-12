import React from "react";
import PropTypes from "prop-types";
import FilmList from "../film-list/film-list.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {getAuthInfo} from "../../reducer/user/selectors.js";
import {connect} from "react-redux";

const FilmListWrapped = withActiveFilm(FilmList);

const MyList = (props) => {
  const {films, authInfo} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link
            className="logo__link"
            to={AppRoute.ROOT}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <Link to={AppRoute.MY_LIST}>
              <img src={`https://4.react.pages.academy${authInfo.avatarUrl}`} alt="User avatar" width="63" height="63" />
            </Link>
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        {films.length &&
          <FilmListWrapped
            films={films}
            showingFilmsCount={films.length}
          />}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link
            className="logo__link logo__link--light"
            to={AppRoute.ROOT}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

MyList.propTypes = {
  films: PropTypes.array.isRequired,
  authInfo: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  authInfo: getAuthInfo(state),
});

export {MyList};
export default connect(mapStateToProps)(MyList);
