import React, { useEffect, useState } from "react";
import { Radar } from "@nivo/radar";
import PropTypes from "prop-types";
import { AutoSizer } from "react-virtualized";
import PointRadarLabel from "../PointRadarLabel";
import PointRadarTooltip from "../PointRadarTooltip";

export default function PointRadar({ data, keys, labels }) {
  const [darkMode, setDarkMode] = useState(false);

  const handleMediaChange = (s) => {
    if (s) {
      setDarkMode(s.matches);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const keyIds = keys.map((key) => key.id);
  const keyLabels = keys.reduce((prev, curr) => {
    prev[curr.id] = curr.label;
    return prev;
  }, {});

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Radar
          height={height}
          width={width}
          data={data}
          keys={keyIds}
          indexBy="factor"
          valueFormat=">-"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: "color" }}
          gridLabelOffset={36}
          dotSize={10}
          gridLabel={(gridProps) =>
            PointRadarLabel({ ...gridProps, label: labels[gridProps.id] })
          }
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          fillOpacity={darkMode ? 0.8 : 0.25}
          colors={{ scheme: "set1" }}
          sliceTooltip={(tooltipProps) =>
            PointRadarTooltip({
              ...tooltipProps,
              dataLabels: keyLabels,
              label: labels[tooltipProps.index],
            })
          }
          theme={{
            textColor: darkMode ? "white" : "black",
            tooltip: {
              container: {
                background: darkMode ? "#52525b" : "white",
                color: darkMode ? "white" : "black",
              },
            },
          }}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              data: keys,
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: darkMode ? "white" : "black",
              symbolSize: 12,
              symbolShape: "triangle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      )}
    </AutoSizer>
  );
}

PointRadar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  keys: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
};
