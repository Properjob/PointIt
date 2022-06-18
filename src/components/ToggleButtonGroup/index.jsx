import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "../ToggleButton";

import styles from "./ToggleButtonGroup.module.css";

export default function ToggleButtonGroup({
  options,
  value,
  onChange,
  label,
  activeColor,
}) {
  const handleClick = (option) => {
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={styles.container}>
      {label}
      <div className={styles.options}>
        {options.map((option) => (
          <ToggleButton
            key={option}
            activeColor={activeColor}
            active={option === value}
            onClick={() => handleClick(option)}
          >
            {option}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
}

ToggleButtonGroup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  label: PropTypes.string,
  activeColor: PropTypes.oneOf(["blue", "red"]),
};

ToggleButtonGroup.defaultProps = {
  value: undefined,
  onChange: undefined,
  label: "",
  activeColor: "blue",
};
