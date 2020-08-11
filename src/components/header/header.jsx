import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from '../../const';
import {connect} from "react-redux";
import {getAuthInfo} from "../../reducer/user/selectors.js";

const Header = (props) => {
  const {authInfo, children} = props;

  return (
    <header className="page-header">
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

      <div className="user-block">
        {authInfo.avatarUrl
          ? <div className="user-block__avatar">
            <img src={`https://4.react.pages.academy${authInfo.avatarUrl}`} alt="User avatar" width="63" height="63" />
          </div>
          : <Link
            to={AppRoute.LOGIN}
            className="user-block__link"
          >Sign in</Link>}
      </div>
    </header>
  );
};

Header.propTypes = {
  authInfo: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

const mapStateToProps = (state) => ({
  authInfo: getAuthInfo(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
