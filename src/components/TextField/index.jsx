import React from "react";
import PropTypes from "prop-types";

import styles from "./TextField.module.css";

export default function TextField({ id, type, label, onChange }) {
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <input id={id} type={type} className={styles.input} onChange={onChange} />
    </label>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  type: "text",
  onChange: undefined,
};
