import Image from "next/image";
import React from "react";

function Products() {
  return (
    <section id="product" className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center w-10/12">
        <div className="flex flex-col justify-items-center text-center">
          <h1 className="text-3xl mb-3 text-primary-light font-bold">
            Our Product
          </h1>
          <h1 className="mb-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
            quaerat accusamus consequatur quidem necessitatibus nihil
            perferendis. Voluptates, id esse. Aliquid rem, delectus temporibus,
            mollitia nostrum, culpa animi eum eligendi adipisci fugiat accusamus
            doloribus quis accusantium ab at unde dolorum possimus.
          </h1>
          <div className="grid gap-10 md:grid-cols-3 grid-cols-1 justify-items-center ">
            <div className="flex gap-3">
              <div className="flex space-y-2 py-5 flex-col items-center justify-center bg-secondary-light w-[310px] p-2 text-center rounded-3xl min-h-2">
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
            <div className="flex gap-3">
              <div className="flex space-y-2 py-5 flex-col items-center justify-center bg-secondary-light w-[310px] p-2 text-center rounded-3xl min-h-2">
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
            <div className="flex gap-3">
              <div className="flex space-y-2 py-5 flex-col items-center justify-center bg-secondary-light w-[310px] p-2 text-center rounded-3xl min-h-2">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
