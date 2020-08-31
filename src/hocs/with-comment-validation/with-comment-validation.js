import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import history from "../../history";
import {AppRoute} from "../../const";

const COMMENT = {
  min: 50,
  max: 400,
};

const RATING = {
  min: 1,
  max: 5,
};

const withSubmit = (Component) => {
  class WithSubmit extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        errorText: ``,
        isSubmitDisabled: true,
        isFormDisabled: false,
      };

      this.handeChange = this.handeChange.bind(this);
      this.handeSubmit = this.handeSubmit.bind(this);
    }

    handeChange(form) {
      const {rating, comment} = form;

      this.setState({
        isSubmitDisabled: comment.length < COMMENT.min || comment.length > COMMENT.max ||
          rating < RATING.min || rating > RATING.max,
      });
    }

    handeSubmit(form, filmId) {
      const {onSubmit} = this.props;
      const {rating, comment} = form;

      this.setState({
        isFormDisabled: true,
        isSubmitDisabled: true,
      });

      onSubmit({rating, comment}, filmId)
        .then(() => history.push(`${AppRoute.FILMS}/${filmId}`))
        .catch((err) => this.setState({
          errorText: err.response.data.error,
          isFormDisabled: false,
        }));
    }

    render() {
      const {isSubmitDisabled, errorText, isFormDisabled} = this.state;

      return (
        <Component
          {...this.props}
          errorText={errorText}
          isSubmitDisabled={isSubmitDisabled}
          isFormDisabled={isFormDisabled}
          onChange={this.handeChange}
          onFormSubmit={this.handeSubmit}
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
