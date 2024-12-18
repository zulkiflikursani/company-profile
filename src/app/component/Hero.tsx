import React from "react";

function Hero() {
  return (
    <section
      id="hero"
      className="bg-hero-pattern bg-contain md:bg-right bg-no-repeat h-screen md:-mt-3 flex flex-col justify-center items-center"
    >
      <div className=" text-primary-light md:text-6xl flex flex-col items-center text-[50px] font-bold  font-hind -mt-52 tracking-tight">
        <div className="text-center">
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
          className="tracking-normal text-primary-light text-center font-bold text-3xl
        "
        >
          Syariah dan Amanah
        </div>
      </div>
      <div className="w-full flex justify-start">
        <button className="bg-primary-light md:ml-20 mx-auto hover:bg-secondary-light text-white  py-3 px-6 mt-10 rounded-full ">
          Book a consultation
        </button>
      </div>
    </section>
  );
}

export default Hero;
