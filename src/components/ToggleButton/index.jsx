import React from "react";
import PropTypes from "prop-types";
import classnames from "../../helpers/classnames";

import styles from "./ToggleButton.module.css";

export default function ToggleButton({
  children,
  active,
  onClick,
  activeColor,
}) {
  return (
    <button
      type="button"
      className={classnames(
        styles.base,
        active ? styles[activeColor] : styles.default
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

ToggleButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  active: PropTypes.bool,
  onClick: PropTypes.func,
  activeColor: PropTypes.oneOf(["blue", "red"]),
};

ToggleButton.defaultProps = {
  children: undefined,
  active: false,
  onClick: undefined,
  activeColor: "blue",
};
