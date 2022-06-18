import React from "react";
import PropTypes from "prop-types";
import classnames from "../../helpers/classnames";

import styles from "./Statistic.module.css";

export default function Statistic({ label, value, color }) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <p className={classnames(styles.value, styles[color])}>{value}</p>
    </div>
  );
}

Statistic.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.oneOf(["blue", "red"]),
};

Statistic.defaultProps = {
  color: "blue",
};
