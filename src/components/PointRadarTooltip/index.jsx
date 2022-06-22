import React, { useMemo } from "react";
import { TableTooltip, Chip } from "@nivo/tooltip";
import PropTypes from "prop-types";

export default function PointRadarTooltip({ data, dataLabels, label }) {
  const rows = useMemo(
    () =>
      data.map((datum) => [
        <Chip key={datum.id} color={datum.color} />,
        dataLabels[datum.id],
        datum.formattedValue,
      ]),
    [data]
  );

  return <TableTooltip title={<strong>{label}</strong>} rows={rows} />;
}

PointRadarTooltip.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      color: PropTypes.string,
      formattedValue: PropTypes.string,
    })
  ).isRequired,
  dataLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};
