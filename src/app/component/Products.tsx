"use client";
import Image from "next/image";
import React from "react";
import data from "@/app/config/file-content.json";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

function Products() {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });
  return (
    <section ref={ref} id="product" className="min-h-screen w-full mb-4">
      <div className="flex min-h-screen items-center justify-center">
        <div className="grid justify-center items-center w-10/12">
          <div className="flex flex-col justify-items-center text-center">
            <h1 className="text-4xl mb-3 text-primary-light font-black">
              {data.products.title}
            </h1>
            <h1 className="mb-7 font-bold w-10/12 mx-auto">
              {data.products.description}
            </h1>
            <div
              className={`grid gap-10 md:grid-cols-3 grid-cols-1 justify-items-center transform transition-all duration-1000 delay-300 ${
                inView ? "scale-100" : "scale-50"
              }`}
            >
              {data.products.products.map((item, index) => {
                return (
                  <div key={index} className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-1 space-y-2 py-5 flex-col items-center justify-items-center bg-secondary-light w-[310px] p-2 text-center rounded-3xl min-h-2">
                      <Image
                        src={item.img}
                        alt={"gambar"}
                        width={200}
                        height={200}
                        className=" "
                      />
                      <h1 className="font-black text-3xl text-primary-light">
                        {item.name}
                      </h1>
                      <div>{item.description}</div>
                      <Link
                        className="bg-primary-light rounded-full px-3 text-[10px] py-1 text-white"
                        href={`/product/${index}`}
                      >
                        lihat selengkapnya
                      </Link>
                    </div>
                  </div>
                );
              })}
              {/* <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 space-y-2 py-5 flex-col items-center justify-items-center bg-secondary-light w-[310px] p-2 text-center rounded-3xl min-h-2">
                  <Image
                    src={"/image/produks/tabungan.png"}
                    alt={"gambar"}
                    width={200}
                    height={200}
                    className=" "
                  />
                  <h1 className="font-black text-3xl text-primary-light">
                    TABUNGAN
                  </h1>
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eius, mollitia.{" "}
                  </div>
                  <button className="bg-primary-light rounded-full px-3 text-[10px] py-1 text-white">
                    lihat selengkapnya
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 space-y-2 py-5 flex-col items-center justify-items-center  bg-secondary-light w-[310px] p-2 text-center rounded-3xl min-h-2">
                  <Image
                    src={"/image/produks/pembiayaan.png"}
                    alt={"gambar"}
                    width={200}
                    height={200}
                    className=" "
                  />
                  <h1 className="font-black text-3xl text-primary-light">
                    PEMBIAYAAN
                  </h1>
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eius, mollitia.{" "}
                  </div>
                  <button className="bg-primary-light rounded-full px-3 text-[10px] py-1 text-white">
                    lihat selengkapnya
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 space-y-2 py-5 flex-col items-center justify-items-center  bg-secondary-light w-[310px] p-2 text-center rounded-3xl min-h-2">
                  <Image
                    src={"/image/produks/deposito.png"}
                    alt={"gambar"}
                    width={200}
                    height={200}
                    className=" "
                  />
                  <h1 className="font-black text-3xl text-primary-light">
                    DEPOSITO
                  </h1>
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Eius, mollitia.{" "}
                  </div>
                  <button className="bg-primary-light rounded-full px-3 text-[10px] py-1 text-white">
                    lihat selengkapnya
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
