import React from "react";
import PropTypes from "prop-types";

const PreviewPlayer = (props) => {
  const {previewVideoLink} = props;

  return (
    <video
      autoPlay
      muted
      width="100%"
      src={previewVideoLink}
    />
  );
};

PreviewPlayer.propTypes = {
  previewVideoLink: PropTypes.string.isRequired,
};

export default PreviewPlayer;
