import React from "react";
import PropTypes from "prop-types";

import styles from "./TextField.module.css";

export default function TextField({
  id,
  type,
  label,
  onChange,
  onBlur,
  value,
  inputRef,
}) {
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input
        id={id}
        name={id}
        type={type}
        className={styles.input}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={inputRef}
      />
    </label>
  );
}

TextField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  inputRef: PropTypes.func,
};

TextField.defaultProps = {
  type: "text",
  id: undefined,
  onChange: undefined,
  onBlur: undefined,
  value: undefined,
  inputRef: undefined,
};
