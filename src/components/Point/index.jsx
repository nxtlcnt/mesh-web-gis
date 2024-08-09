import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import maplibregl from "maplibre-gl";
import Chart from "chart.js/auto";
import Image from "next/image";

let charts = {};

export default function Point({ map, data }) {
  useEffect(() => {
    if (map && data.length > 0) {
      data.forEach((item) => {
        const canvasId = `lstChart_${item.poi_name.replace(/\s+/g, "_")}`;

        const popupContainer = document.createElement("div");

        const popupContent = (
          <div style={{ color: "black" }}>
            <Image
              src={item.url}
              alt={item.poi_name}
              width={400} // Replace with appropriate width
              height={200} // Replace with appropriate height
              style={{ width: "100%", height: "auto" }}
              onError={(e) =>
                (e.currentTarget.src = "/path/to/fallback/image.png")
              }
            />
            <h3 style={{ fontWeight: "bold" }}>{item.poi_name}</h3>
            <h4>
              {item.address}, {item.admin_5}, {item.admin_4}, {item.admin_3},{" "}
              {item.admin_2}, {item.postal_cod}
            </h4>
            <p>LST 2023: {item.lst_23}</p>
            <canvas id={canvasId} width="400" height="200"></canvas>
          </div>
        );

        const root = createRoot(popupContainer);
        root.render(popupContent);

        const popup = new maplibregl.Popup({ offset: 25 }).setDOMContent(
          popupContainer
        );

        const iconUrl = "/icons/marker.png";

        const marker = new maplibregl.Marker({
          element: createCustomMarker(iconUrl),
        })
          .setLngLat(item.geom.coordinates)
          .setPopup(popup)
          .addTo(map);

        marker.getPopup().on("open", () => {
          setTimeout(() => {
            initializeChart(item, canvasId);
          }, 100);
        });
      });
    }
  }, [map, data]);

  const initializeChart = (item, canvasId) => {
    const canvasElement = document.getElementById(canvasId);
    if (canvasElement) {
      if (charts[canvasId]) {
        charts[canvasId].destroy();
      }

      const ctx = canvasElement.getContext("2d");
      charts[canvasId] = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              label: "LST Over the Years",
              data: [
                item.lst_19,
                item.lst_20,
                item.lst_21,
                item.lst_22,
                item.lst_23,
              ],
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              min: 30,
              max: 40,
            },
          },
        },
      });
    }
  };

  const createCustomMarker = (iconUrl) => {
    const markerElement = document.createElement("div");
    markerElement.style.backgroundImage = `url(${iconUrl})`;
    markerElement.style.backgroundSize = "contain";
    markerElement.style.backgroundRepeat = "no-repeat";
    markerElement.style.width = "30px";
    markerElement.style.height = "30px";
    return markerElement;
  };

  return null;
}
