import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";
import classnames from "../../helpers/classnames";

export default function Button({ type, children, onClick, disabled }) {
  return (
    <button
      type={type === "button" ? "button" : "submit"}
      onClick={onClick}
      className={classnames(styles.default, disabled && styles.disabled)}
      disabled={disabled}
    >
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
  type: PropTypes.oneOf(["button", "submit"]),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: "button",
  disabled: false,
  onClick: undefined,
};
