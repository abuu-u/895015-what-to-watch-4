import React from "react";
import PromoFilm from "../promo-film/promo-film.jsx";
import FilmList from "../film-list/film-list.jsx";
import GenresFilter from "../genres-filter/genres-filter.jsx";
import ShowMore from "../show-more/show-more.jsx";
import withActiveFilm from "../../hocs/with-active-film/with-active-film";
import PropTypes from "prop-types";
import Footer from "../footer/footer.jsx";

const FilmListWrapped = withActiveFilm(FilmList);

const Main = (props) => {
  const {
    promoFilm,
    films,
    filmsByGenre,
    activeGenre,
    showingFilmsCount,
    authorizationStatus,
    authInfo,
    onGenreClick,
    onShowMoreClick,
    onPromFilmAddToFavorites,
  } = props;

  return (
    <>
    <PromoFilm
      promoFilm={promoFilm}
      authorizationStatus={authorizationStatus}
      authInfo={authInfo}
      onPromFilmAddToFavorites={onPromFilmAddToFavorites}
    />

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresFilter
          activeGenre={activeGenre}
          films={films}
          onGenreClick={onGenreClick}
        />

        <FilmListWrapped
          films={filmsByGenre}
          showingFilmsCount={showingFilmsCount}
        />

        {filmsByGenre.length > showingFilmsCount && <ShowMore
          onShowMoreClick={onShowMoreClick}
        />}
      </section>

      <Footer/>
    </div>
  </>
  );
};

Main.propTypes = {
  promoFilm: PropTypes.object.isRequired,
  films: PropTypes.array.isRequired,
  filmsByGenre: PropTypes.array.isRequired,
  activeGenre: PropTypes.string.isRequired,
  showingFilmsCount: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.object,
  onGenreClick: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onPromFilmAddToFavorites: PropTypes.func.isRequired,
};

export default Main;
