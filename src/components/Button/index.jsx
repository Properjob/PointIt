import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

export default function Button({ children, onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.default}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};
