import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const EMAIL_VALIDATION_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_IS_NOT_VALID_TEXT = `Please enter a valid email address`;

const withSubmit = (Component) => {
  class WithSubmit extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        errorText: ``,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit({login, password}) {
      const {onSubmit} = this.props;

      if (!EMAIL_VALIDATION_REGEXP.test(login)) {
        this.setState({errorText: EMAIL_IS_NOT_VALID_TEXT});
      } else {
        onSubmit({
          login,
          password,
        }).catch((err) => this.setState({errorText: err.response.data.error}));
      }
    }

    render() {
      const {errorText} = this.state;

      return (
        <Component
          {...this.props}
          errorText={errorText}
          onLogin={this.handleSubmit}
        />
      );
    }
  }

  WithSubmit.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  return WithSubmit;
};

export default withSubmit;
