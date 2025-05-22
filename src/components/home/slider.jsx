"use client";
import React from "react";

const sliderSection = () => {
  return (
    <div className="relative h-[400px] overflow-hidden">
      {sliderImages.map((url, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`${url}?auto=format&fit=crop&w=1600&q=80`}
            alt={`slide-${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-black p-2 rounded-full"
      >
        →
      </button>
    </div>
  );
};
export default sliderSection;
