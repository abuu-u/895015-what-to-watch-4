import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from '../../reducer/user/user';
import {connect} from "react-redux";
import {getAuthorizationStatus, getAuthInfo} from "../../reducer/user/selectors.js";

const Header = (props) => {
  const {authorizationStatus, authInfo, children} = props;

  return (
    <header className="page-header">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {children}

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.NO_AUTH ?
          <a href="sign-in" className="user-block__link">Sign in</a> :
          <div className="user-block__avatar">
            <img src={`https://4.react.pages.academy${authInfo.avatarUrl}`} alt="User avatar" width="63" height="63" />
          </div>}
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  authInfo: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthInfo(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
