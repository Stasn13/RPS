import React from "react";
import PropTypes from "prop-types";
import "./Loader.css";

const Loader = ({ enabled, message }) => {
  return (
    <div className={`backdrop ${enabled ? "" : "hide"}`}>
      <div className="loader" />
      <div className="message">{message}</div>
    </div>
  );
};

Loader.propTypes = {
  enabled: PropTypes.bool,
  message: PropTypes.string,
};

export default Loader;
