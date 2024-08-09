"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import PolygonView from "../PolygonView";
import { FaInstagram, FaBook } from "react-icons/fa";

export default function NavSide({ selectedYear, onCheckboxChange }) {
  const [open, setOpen] = useState(false);
  const [showPolygonView, setShowPolygonView] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleLayerControlToggle = () => {
    setShowPolygonView((prev) => !prev);
  };

  return (
    <div>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: open ? 400 : 0, opacity: open ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed top-0 left-0 h-full bg-[#a0d4c4] shadow-md overflow-hidden p-4 z-50"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <button
          onClick={handleToggle}
          className="absolute top-4 right-4 text-sm font-bold text-black"
        >
          ✕
        </button>
        <div className="flex items-center mt-9 px-2">
          <Image src="/mesh.svg" alt="Mesh Icon" width={40} height={40} />
          <span className="ml-2 px-2 text-4xl font-extrabold text-gray-900">
            MESH
          </span>
        </div>
        <h1 className="mt-9 text-xl px-2 text-gray-900 font-semibold">
          Land Surface Temperature (LST) of Jababeka City, Cikarang, Bekasi
        </h1>
        <h3 className="mt-6 text-md px-2 text-slate-700 font-medium">
          Over the past five years, land surface temperatures in Jababeka,
          Cikarang, have fluctuated significantly, emphasizing the urgent need
          for smart urban planning. To ensure a cooler, more sustainable
          environment, it’s crucial to take action now.
        </h3>
        <div className="mt-9 px-2">
          <button
            onClick={handleLayerControlToggle}
            className="flex items-center text-gray-900 text-sm font-medium mb-2"
          >
            {showPolygonView ? (
              <FaChevronUp className="mr-2" />
            ) : (
              <FaChevronDown className="mr-2" />
            )}
            {showPolygonView ? "Hide Mean LST" : "Show Mean LST"}
          </button>
          {showPolygonView && (
            <PolygonView
              selectedYear={selectedYear}
              onCheckboxChange={onCheckboxChange}
            />
          )}
        </div>
        <footer className="flex justify-between items-center p-4 bg-[#a0d4c4] mt-56">
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://drive.google.com/file/d/11N80phR-U0QDhwfVS73VOHG3nvOYLNyS/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
              aria-label="React Docs"
            >
              <FaBook size={21} />
            </a>
          </div>
          <div className="text-sm text-gray-700">2024© Developed by MESH</div>
        </footer>
      </motion.div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: open ? 0 : 1 }}
        transition={{ type: "tween", stiffness: 400, damping: 25 }}
        className="fixed top-4 left-4 z-50"
      >
        <button
          onClick={handleToggle}
          className="relative w-8 h-8 rounded-md bg-[#a0d4c4] text-gray-950 shadow-md flex items-center justify-center"
        >
          <div className="relative w-5 h-5 flex flex-col justify-center items-center">
            <motion.div
              className="absolute bg-gray-950 h-0.5 w-3"
              initial={{ rotate: 0, y: -3 }}
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -2 }}
              transition={{ type: "tween" }}
            />
            <motion.div
              className="absolute bg-gray-950 h-0.5 w-3"
              initial={{ rotate: 0, y: 3 }}
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 2 }}
              transition={{ type: "tween" }}
            />
          </div>
        </button>
      </motion.div>
    </div>
  );
}
