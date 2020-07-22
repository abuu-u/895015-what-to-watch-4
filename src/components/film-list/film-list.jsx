import React from "react";
import PropTypes from "prop-types";
import Film from '../film/film.jsx';

class FilmList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilmId: null,
    };

    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.onFilmHover = this.onFilmHover.bind(this);
  }

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => <Film
          film={film}
          onHeaderClick={this.onHeaderClick}
          onFilmHover={this.onFilmHover}
          key={film + index}
        />)}
      </div>
    );
  }

  onHeaderClick() {}

  onFilmHover(evt) {
    this.setState({activeFilmId: evt.currentTarget.id});
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  })).isRequired,
};

export default FilmList;
