import React, {createRef} from "react";
import PropTypes from "prop-types";
import {AppRoute} from "../../const";
import history from "../../history";
import Footer from "../footer/footer.jsx";
import Header from "../header/header.jsx";

const ERROR_CLASS = `sign-in__field--error`;

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();
  }

  render() {
    const {onSubmit, errorText} = this.props;

    return (
      <div className="user-page">
        <Header
          isUserPage={true}
        >
          <h1 className="page-title user-page__title">Sign in</h1>
        </Header>

        <div className="sign-in user-page__content">
          <form
            action="#"
            className="sign-in__form"
            onSubmit={(evt) => {
              evt.preventDefault();
              const login = this.loginRef.current.value;
              const password = this.passwordRef.current.value;

              onSubmit({login, password})
                .then(() => history.push(AppRoute.ROOT));
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

        <Footer/>
      </div>
    );
  }
}

SignIn.propTypes = {
  errorText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};


export default SignIn;
