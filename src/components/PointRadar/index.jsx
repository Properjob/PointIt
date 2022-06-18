import React, { useEffect, useState } from "react";
import { Radar } from "@nivo/radar";
import PropTypes from "prop-types";
import { AutoSizer } from "react-virtualized";

export default function PointRadar({ data, keys }) {
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
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Radar
          height={height}
          width={width}
          data={data}
          keys={keys}
          indexBy="factor"
          valueFormat=">-"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: "color" }}
          gridLabelOffset={36}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          fillOpacity={darkMode ? 0.8 : 0.25}
          colors={{ scheme: "set1" }}
          theme={{
            textColor: darkMode ? "white" : "black",
          }}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              anchor: "top-left",
              direction: "column",
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999",
              symbolSize: 12,
              symbolShape: "circle",
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
  // eslint-disable-next-line react/forbid-prop-types
  keys: PropTypes.array.isRequired,
};
