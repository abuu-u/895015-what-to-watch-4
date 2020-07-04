import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {name, genre, releaseDate} = props;

  return (
    <Main
      name={name}
      genre={genre}
      releaseDate={releaseDate}
    />
  );
};

export default App;
