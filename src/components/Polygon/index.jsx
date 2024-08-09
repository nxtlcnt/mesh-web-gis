"use client";
import { useEffect } from "react";
import maplibregl from "maplibre-gl";

export default function Polygon({ map, data, selectedYear }) {
  useEffect(() => {
    if (!map) return;

    const sourceId = "polygon-data";
    const layerId = "polygon-layer";

    if (map.getSource(sourceId)) {
      map.removeLayer(layerId);
      map.removeSource(sourceId);
    }

    if (!data || !selectedYear) return;

    const geojson = {
      type: "FeatureCollection",
      features: data.map((item) => ({
        type: "Feature",
        geometry: item.geom,
        properties: {
          value: item[`lst_${selectedYear}`],
          admin_6: item.admin_6,
        },
      })),
    };

    map.addSource(sourceId, {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: layerId,
      type: "fill",
      source: sourceId,
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["get", "value"],
          33.06,
          "#1a9850",
          34.63,
          "#91cf60",
          35.84,
          "#d9ef8b",
          36.63,
          "#fee08b",
          37.56,
          "#fc8d59",
          39.62,
          "#d73027",
        ],
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["get", "value"],
          33.06,
          0.4,
          39.62,
          1,
        ],
      },
    });

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on("mouseenter", layerId, (e) => {
      map.getCanvas().style.cursor = "pointer";

      const coordinates = e.lngLat;
      const { value, admin_6 } = e.features[0].properties;

      popup
        .setLngLat(coordinates)
        .setHTML(
          `
          <div style="color: #333; font-size: 14px; font-family: Arial, sans-serif;">
            <strong>Kelurahan</strong> ${admin_6}<br/>
            <strong>Mean LST (${selectedYear}):</strong> ${value}
          </div>
        `
        )
        .addTo(map);
    });

    map.on("mouseleave", layerId, () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });

    return () => {
      if (map.getSource(sourceId)) {
        map.removeLayer(layerId);
        map.removeSource(sourceId);
      }
      map.off("mouseenter", layerId);
      map.off("mouseleave", layerId);
    };
  }, [map, data, selectedYear]);

  return null;
}
