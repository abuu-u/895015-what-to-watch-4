import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const EMAIL_VALIDATION_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_IS_NOT_VALID_TEXT = `Please enter a valid email address`;

const withLoginValidation = (Component) => {
  class WithLoginValidation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        errorText: ``,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({login, password}) {
      const {onLogin} = this.props;

      if (!EMAIL_VALIDATION_REGEXP.test(login)) {
        this.setState({errorText: EMAIL_IS_NOT_VALID_TEXT});
      } else {
        return onLogin({
          login,
          password,
        })
        .catch((err) => this.setState({errorText: err.response.data.error}));
      }

      return null;
    }

    render() {
      const {errorText} = this.state;

      return (
        <Component
          {...this.props}
          errorText={errorText}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }

  WithLoginValidation.propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  return WithLoginValidation;
};

export default withLoginValidation;
