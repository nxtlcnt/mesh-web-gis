"use client";
import React, { useState, useEffect } from "react";
import BaseMap from "../BaseMap";
import Polygon from "../Polygon";
import Point from "../Point";
import NavSide from "../NavSide";
import MapLegend from "../MapLegend";

export default function MapView() {
  const [map, setMap] = useState(null);
  const [pointData, setPointData] = useState([]);
  const [polygonData, setPolygonData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    async function fetchPointData() {
      try {
        const response = await fetch(`${baseUrl}/api/point`, {
          next: { revalidate: 10 },
        });
        const { data: projectData } = await response.json();
        setPointData(projectData);
      } catch (error) {
        console.error("Error fetching point data:", error);
      }
    }

    async function fetchPolygonData() {
      try {
        const response = await fetch(`${baseUrl}/api/polygon`, {
          next: { revalidate: 10 },
        });
        const { data: polygonData } = await response.json();
        setPolygonData(polygonData);
      } catch (error) {
        console.error("Error fetching polygon data:", error);
      }
    }

    fetchPointData();
    fetchPolygonData();
  }, [baseUrl]);

  const handleCheckboxChange = (year) => {
    setSelectedYear(year);
  };

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className="relative w-full h-full flex">
      <NavSide
        selectedYear={selectedYear}
        onCheckboxChange={handleCheckboxChange}
        onToggle={handleSidebarToggle}
      />
      <div
        className={`flex-1 h-full relative ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <BaseMap onMapLoaded={setMap} />
        {map && <Point map={map} data={pointData} />}
        {map && selectedYear && (
          <Polygon map={map} data={polygonData} selectedYear={selectedYear} />
        )}
        <MapLegend className="mb-2" />
      </div>
    </div>
  );
}
