import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from '../../const';

const User = (props) => {
  const {authInfo} = props;

  return (
    <div className="user-block">
      {authInfo.avatarUrl
        ? <div className="user-block__avatar">
          <Link to={AppRoute.MY_LIST}>
            <img src={`https://4.react.pages.academy${authInfo.avatarUrl}`} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
        : <Link
          to={AppRoute.LOGIN}
          className="user-block__link"
        >Sign in</Link>}
    </div>
  );
};

User.propTypes = {
  authInfo: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),
};

export default User;
