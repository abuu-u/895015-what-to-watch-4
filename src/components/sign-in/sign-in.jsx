import React, {createRef} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const ERROR_CLASS = `sign-in__field--error`;

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();
  }

  render() {
    const {onLogin, errorText} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
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

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form
            action="#"
            className="sign-in__form"
            onSubmit={(evt) => {
              evt.preventDefault();
              const login = this.loginRef.current.value;
              const password = this.passwordRef.current.value;

              onLogin({login, password});
            }}
          >
            <div className="sign-in__message">
              <p>{errorText}</p>
            </div>
            <div className={`sign-in__fields ${errorText ? ERROR_CLASS : ``}`}>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="text"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.loginRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this.passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <Link
              to={AppRoute.ROOT}
              className="logo__link logo__link--light"
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
  }
}

SignIn.propTypes = {
  errorText: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
};


export default SignIn;
