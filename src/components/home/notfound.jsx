import React from "react";

const NotFound = () => {
  return (
    <div>
      <div className="d-flex justify-content-center userheading">
        The page you are looking for is not found.
      </div>
      <div className="d-flex justify-content-center userheading">
        <a href="http://localhost:3000/">
          You can go back to home page from here
        </a>
      </div>
    </div>
  );
};

export default NotFound;
