import React from "react";
import PropTypes from "prop-types";
import FilmList from "../film-list/film-list.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import User from "../user/user.jsx";

const FilmListWrapped = withActiveFilm(FilmList);

const MyList = (props) => {
  const {films, authInfo} = props;

  return (
    <div className="user-page">
      <Header
        isUserPage={true}
      >
        <h1 className="page-title user-page__title">My list</h1>
        <User
          authInfo={authInfo}
        />
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmListWrapped
          films={films}
          showingFilmsCount={films.length}
        />
      </section>

      <Footer/>
    </div>
  );
};

MyList.propTypes = {
  films: PropTypes.array.isRequired,
  authInfo: PropTypes.object,
};

export default MyList;
