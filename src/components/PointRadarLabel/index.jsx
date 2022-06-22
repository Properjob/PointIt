import React from "react";
import PropTypes from "prop-types";

import styles from "./PointRadarLabel.module.css";

export default function PointRadarLabel({ x, y, anchor, label }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g>
        <text textAnchor={anchor} className={styles.text}>
          {label}
        </text>
      </g>
    </g>
  );
}

PointRadarLabel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  anchor: PropTypes.oneOf(["start", "middle", "end"]).isRequired,
  label: PropTypes.string.isRequired,
};
