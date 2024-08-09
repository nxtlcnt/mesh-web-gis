"use client";
import React from "react";

export default function PolygonView({ selectedYear, onCheckboxChange }) {
  const handleChange = (event) => {
    const year = event.target.value;
    if (selectedYear === year) {
      onCheckboxChange("");
    } else {
      onCheckboxChange(year);
    }
  };

  return (
    <div className="px-5 flex space-x-4">
      <label className="flex items-center gap-2 text-xs text-black">
        <input
          type="checkbox"
          name="year"
          value="19"
          onChange={handleChange}
          checked={selectedYear === "19"}
        />
        2019
      </label>
      <label className="flex items-center gap-2 text-xs text-black">
        <input
          type="checkbox"
          name="year"
          value="20"
          onChange={handleChange}
          checked={selectedYear === "20"}
        />
        2020
      </label>
      <label className="flex items-center gap-2 text-xs text-black">
        <input
          type="checkbox"
          name="year"
          value="21"
          onChange={handleChange}
          checked={selectedYear === "21"}
        />
        2021
      </label>
      <label className="flex items-center gap-2 text-xs text-black">
        <input
          type="checkbox"
          name="year"
          value="22"
          onChange={handleChange}
          checked={selectedYear === "22"}
        />
        2022
      </label>
      <label className="flex items-center gap-2 text-xs text-black">
        <input
          type="checkbox"
          name="year"
          value="23"
          onChange={handleChange}
          checked={selectedYear === "23"}
        />
        2023
      </label>
    </div>
  );
}
