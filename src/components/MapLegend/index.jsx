"use client";
import React from "react";

const colorStops = [
  { value: 33.06, color: "#1a9850" },
  { value: 34.63, color: "#91cf60" },
  { value: 35.84, color: "#d9ef8b" },
  { value: 36.63, color: "#fee08b" },
  { value: 37.56, color: "#fc8d59" },
  { value: 39.62, color: "#d73027" },
];

const MapLegend = () => {
  return (
    <div className="map-legend">
      <div className="legend-title">Temperature Range</div>
      {colorStops.map((stop) => (
        <div className="legend-item" key={stop.value}>
          <div
            className="legend-color"
            style={{ background: stop.color }}
          ></div>
          {stop.value}°C
        </div>
      ))}
      <style jsx>{`
        .map-legend {
          background: white;
          border: 1px solid #ddd;
          border-radius: 3px;
          padding: 10px;
          font-size: 12px;
          line-height: 1.5;
          max-width: 200px;
          margin: 10px;
          position: fixed;
          bottom: 40px; /* Adjusted to move up */
          right: 10px; /* Adjusted to move right */
          z-index: 1000;
          color: black; /* Changed text color to black */
        }
        .legend-title {
          font-weight: bold;
          margin-bottom: 6px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
        .legend-color {
          width: 20px;
          height: 10px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default MapLegend;
