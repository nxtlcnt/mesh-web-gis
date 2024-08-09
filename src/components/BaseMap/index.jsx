"use client";
import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import MapStyles from "../MapStyles";
import { MdCenterFocusWeak } from "react-icons/md";

export default function BaseMap({ onMapLoaded }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (mapRef.current) {
      const newMap = new maplibregl.Map({
        container: mapRef.current,
        style:
          "https://api.maptiler.com/maps/topo-v2/style.json?key=KtBUKemQVU76TGZj4CUa",
        center: [107.1721, -6.3579],
        zoom: 12,
      });

      newMap.addControl(new maplibregl.NavigationControl(), "top-right");

      const scale = new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: "metric",
      });
      newMap.addControl(scale);

      if (onMapLoaded) {
        onMapLoaded(newMap);
      }

      setMap(newMap);

      return () => {
        if (newMap) {
          newMap.remove();
        }
      };
    }
  }, [onMapLoaded]);

  const handleCenterClick = () => {
    if (map) {
      map.flyTo({
        center: [107.1721, -6.3579],
        zoom: 12,
        essential: true,
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-28 right-2 flex flex-col items-end space-y-2">
        <button
          onClick={handleCenterClick}
          className="bg-white rounded shadow-lg flex items-center justify-center w-8 h-8"
        >
          <MdCenterFocusWeak className="w-5 h-5 text-black" />
        </button>
      </div>
      {map && <MapStyles map={map} />}
      <style jsx>{`
        .maplibregl-ctrl-bottom-left {
          display: none;
        }
        .maplibregl-ctrl-bottom-right {
          display: none;
        }
        .maplibregl-ctrl-bottom-center {
          position: absolute;
          bottom: 10px; /* Adjust as needed */
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </div>
  );
}
