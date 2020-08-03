import React from "react";
import PropTypes from "prop-types";
import Overview from '../overview/overview.jsx';
import Details from '../details/details.jsx';
import Reviews from '../reviews/reviews.jsx';
import {TAB, TABS} from '../../const';

const Tab = (props) => {
  const {film, comments, activeTab} = props;

  const getTabByType = (type) => {
    switch (type) {
      case TAB.overview:
        return (<Overview
          film={film}
        />);
      case TAB.details:
        return (<Details
          film={film}
        />);
      case TAB.reviews:
        return (<Reviews
          comments={comments}
        />);
    }

    return type;
  };

  return getTabByType(activeTab);
};

Tab.propTypes = {
  film: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  activeTab: PropTypes.oneOf(TABS).isRequired,
};

export default Tab;
