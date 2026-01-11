"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import hero1 from "@/asset/darya-tryfanava-d55fhArDES0-unsplash.jpg";
import hero2 from "@/asset/edwin-andrade-4V1dC_eoCwg-unsplash.jpg";
import hero3 from "@/asset/vadim-sherbakov-d6ebY-faOO0-unsplash.jpg";

const images = [hero1, hero2, hero3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt="University campus"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            RMIT University
          </h1>
          <p className="text-lg md:text-xl">
            Official notice board for academic, administrative & general
            announcements
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
