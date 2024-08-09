import React, { useEffect } from "react";

const MapStyles = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    const layerSwitcherControl = new LayerSwitcherControl({
      basemaps: {
        topo: {
          id: "topo",
          img: "https://docs.maptiler.com/sdk-js/api/map-styles/img/style-streets-v2.jpeg",
        },
        satellite: {
          id: "satellite",
          img: "https://docs.maptiler.com/sdk-js/api/map-styles/img/style-satellite.jpeg",
        },
      },
      initialBasemap: { id: "topo" },
    });

    map.addControl(layerSwitcherControl, "bottom-left");

    return () => {
      map.removeControl(layerSwitcherControl);
    };
  }, [map]);

  return null;
};

// Custom Layer Switcher Control
class LayerSwitcherControl {
  constructor(options) {
    this._options = { ...options };
    this._container = document.createElement("div");
    this._container.classList.add(
      "maplibregl-ctrl",
      "maplibregl-ctrl-basemaps",
      "flex",
      "space-x-1", // Reduced space between images
      "p-2", // Padding around the switcher
      "rounded-md", // Rounded container
      "shadow-md", // Optional shadow for better visibility
      "opacity-70",
      "transition-opacity",
      "duration-300"
    );
    this._container.classList.add("flex-row");
    this._container.addEventListener("mouseenter", () => {
      this._container.classList.remove("opacity-70");
      this._container.classList.add("opacity-100");
    });
    this._container.addEventListener("mouseleave", () => {
      this._container.classList.add("opacity-70");
      this._container.classList.remove("opacity-100");
    });
  }

  onAdd(map) {
    this._map = map;
    const basemaps = this._options.basemaps;
    Object.keys(basemaps).forEach((layerId) => {
      const base = basemaps[layerId];
      const basemapContainer = document.createElement("div");
      basemapContainer.classList.add(
        "w-24",
        "h-24",
        "cursor-pointer",
        "rounded-lg",
        "flex",
        "items-center",
        "justify-center",
        "transition-transform"
      );
      basemapContainer.dataset.id = layerId;

      const img = document.createElement("img");
      img.src = base.img;
      img.alt = `${layerId} map`;
      img.classList.add("w-24", "h-24", "gap-2", "rounded-lg", "opacity-1"); // Adjust size of the image inside button
      basemapContainer.appendChild(img);

      basemapContainer.addEventListener("click", () => {
        const activeElement = this._container.querySelector(".active");
        if (activeElement) activeElement.classList.remove("active");
        basemapContainer.classList.add("active", "border-blue-500");
        map.setStyle(
          layerId === "topo"
            ? "https://api.maptiler.com/maps/topo-v2/style.json?key=KtBUKemQVU76TGZj4CUa"
            : "https://api.maptiler.com/maps/satellite/style.json?key=KtBUKemQVU76TGZj4CUa"
        );
      });

      if (this._options.initialBasemap.id === layerId) {
        basemapContainer.classList.add("active", "border-blue-500");
      }

      this._container.appendChild(basemapContainer);
    });
    return this._container;
  }

  onRemove() {
    this._container.parentNode?.removeChild(this._container);
    delete this._map;
  }
}

export default MapStyles;
