import React from "react";

function Hero() {
  return (
    <section
      id="hero"
      className="bg-hero-pattern bg-contain bg-right bg-no-repeat h-screen -mt-3 flex flex-col justify-center items-center "
    >
      <div className=" text-primary-light text-6xl font-bold  font-hind -mt-52 tracking-tight">
        <div>
          PEMBIAYAAN{" "}
          <span className="text-secondary-light  text-[70px]">|</span> TABUNGAN{" "}
          <span className="text-secondary-light text-[70px]">|</span> DEPOSITO
        </div>
        <div
          className="tracking-normal text-primary-light text-center font-bold text-3xl
        "
        >
          Syariah dan Amanah
        </div>
      </div>
      <div className="w-full flex justify-start">
        <button className="bg-primary-light ml-20 hover:bg-secondary-light text-white  py-3 px-6 mt-10 rounded-full ">
          Book a consultation
        </button>
      </div>
    </section>
  );
}

export default Hero;
