"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Image from "next/image";

// swiper css
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// images from assets
import CSE from "@/asset/departments/markus-spiske-1LLh8k2_YFk-unsplash.jpg";
import EEE from "@/asset/departments/EEE.jpg";
import BBA from "@/asset/departments/BBa.jpg";
import English from "@/asset/departments/English.jpg";
import Economics from "@/asset/departments/econo.jpg";
import Math from "@/asset/departments/Math.jpg";

const departments = [
  { name: "CSE", img: CSE },
  { name: "EEE", img: EEE },
  { name: "BBA", img: BBA },
  { name: "English", img: English },
  { name: "Economics", img: Economics },
  { name: "Mathematics", img: Math },
];

const DepartmentsSection = () => {
  return (
    <section className="py-20">
      <div className="px-6 max-w-11/12 mx-auto ">

        {/* Section Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Our <span className="bg-gradient-to-r to-cyan-400 from-cyan-800
              bg-clip-text text-transparent">Departments</span>
        </h3>

        <Swiper
          loop
          centeredSlides
          grabCursor
          effect="coverflow"
          slidesPerView={3}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="pb-12"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {departments.map((dep) => (
            <SwiperSlide key={dep.name}>
              <div className="relative h-[280px] rounded-xl overflow-hidden shadow-lg">

                {/* Background Image */}
                <Image
                  src={dep.img}
                  alt={dep.name}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <h4 className="text-2xl font-bold mb-1">
                    {dep.name}
                  </h4>
                  <p className="text-sm text-cyan-200">
                    Department of {dep.name}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default DepartmentsSection;
