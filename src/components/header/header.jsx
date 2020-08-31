import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from '../../const';

const USER_PAGE_CLASS = `user-page__head`;

const Header = (props) => {
  const {children, isUserPage} = props;

  return (
    <header className={`page-header ${isUserPage ? USER_PAGE_CLASS : ``}`}>
      <div className="logo">
        <Link
          to={AppRoute.ROOT}
          className="logo__link"
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  isUserPage: PropTypes.bool,
};

export default React.memo(Header);
