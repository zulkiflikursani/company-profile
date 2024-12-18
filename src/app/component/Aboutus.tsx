import Image from "next/image";
import React from "react";

function Aboutus() {
  return (
    <section id="about" className="h-screen flex justify-center items-center">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 justify-items-center">
        <div className="h-full flex flex-col justify-center p-20 gap-10">
          <h1 className="text-7xl text-primary-light font-bold">About Us</h1>
          <h1>
            A team comprised of board certified accountants, Manreka Accounting
            helps you handle accounting problems in the most accessible and
            convenient way.
          </h1>
        </div>
        <div>
          <Image
            src={"/image/about/about.png"}
            width={500}
            height={500}
            alt={"Gambar"}
            className="bg-green-200"
          />
        </div>
      </div>
    </section>
  );
}

export default Aboutus;