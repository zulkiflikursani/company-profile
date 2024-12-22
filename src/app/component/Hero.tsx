"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="bg-hero-pattern bg-contain md:bg-right bg-no-repeat h-screen md:-mt-3 flex flex-col justify-center items-center"
    >
      <div className="text-primary-light md:text-6xl flex flex-col items-center text-[50px] font-bold  font-hind -mt-52 tracking-tight">
        <div
          className={`text-center transform transition-all duration-500 ${
            inView ? "scale-100" : "scale-50"
          }`}
        >
          PEMBIAYAAN{" "}
          <span className="text-secondary-light  md:text-[70px] hidden md:inline">
            |
          </span>{" "}
          TABUNGAN{" "}
          <span className="text-secondary-light md:text-[70px] hidden md:inline">
            |
          </span>{" "}
          DEPOSITO
        </div>
        <div
          className={`tracking-normal text-primary-light text-center font-bold text-3xl transform transition-all duration-700 delay-150 opacity-0 translate-y-4 ${
            inView ? "opacity-100 translate-y-0" : ""
          }`}
        >
          Syariah dan Amanah
        </div>
      </div>
      <div className="w-full flex justify-start">
        <button
          className={`bg-primary-light md:ml-20 mx-auto text-white py-3 px-6 mt-10 rounded-full transform transition-all duration-300  ${
            inView ? "scale-105" : ""
          } `}
        >
          Book a consultation
        </button>
      </div>
    </section>
  );
}

export default Hero;
