import React, {PureComponent} from "react";

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
        isSubmitDisabled: true,
      };

      this.handeChange = this.handeChange.bind(this);
    }

    handeChange(form) {
      const {rating, comment} = form;

      this.setState({
        isSubmitDisabled: comment.length < COMMENT.min || comment.length > COMMENT.max ||
          rating < RATING.min || rating > RATING.max,
      });
    }

    render() {
      const {isSubmitDisabled} = this.state;

      return (
        <Component
          {...this.props}
          isSubmitDisabled={isSubmitDisabled}
          onChange={this.handeChange}
        />
      );
    }
  }

  WithSubmit.propTypes = {};

  return WithSubmit;
};

export default withSubmit;
