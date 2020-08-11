import React from "react";
import PropTypes from "prop-types";
import Tab from '../tab/tab.jsx';
import {TABS} from '../../const';

const activeClass = `movie-nav__item--active`;

const Tabs = (props) => {
  const {film, activeTab, comments, onClick} = props;

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {TABS.map((tab, index) => {
            return (
              <li
                className={`movie-nav__item ${tab === activeTab ? activeClass : ``}`}
                key={tab + index}
              >
                <a
                  href="#"
                  className="movie-nav__link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onClick(evt.currentTarget.dataset.id);
                  }}
                  data-id={tab}
                >{tab}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <Tab
        film={film}
        comments={comments}
        activeTab={activeTab}
      />
    </div>
  );
};

Tabs.propTypes = {
  film: PropTypes.object.isRequired,
  activeTab: PropTypes.oneOf(TABS).isRequired,
  comments: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default Tabs;
