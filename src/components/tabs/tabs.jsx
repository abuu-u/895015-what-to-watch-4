import React from "react";
import PropTypes from "prop-types";
import Tab from '../tab/tab.jsx';
import {TABS} from '../../const';
import {generateComments} from '../../mock/comment';

const COMMENTS_COUNT = 9;

const comments = generateComments(COMMENTS_COUNT);

const activeClass = `movie-nav__item--active`;

const Tabs = (props) => {
  const {film, activeTab, onClick} = props;

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
                  onClick={onClick}
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
  onClick: PropTypes.func.isRequired,
};

export default Tabs;
