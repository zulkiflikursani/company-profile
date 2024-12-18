import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="w-10/12 mx-auto mb-10">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-32">
        <div className="flex flex-col max-w-[400px]">
          <Image
            src={"/image/logo.png"}
            height={100}
            width={200}
            alt="gambar"
          />
          <h2>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. At rem,
            accusantium corrupti dicta quis tempora, impedit, delectus quod
            nulla adipisci veniam dignissimos quaerat quo et in obcaecati!
            Deserunt asperiores eos enim debitis earum molestias ex nesciunt
            porro, expedita libero illum optio. Error odio porro tempore maiores
            officia ducimus tenetur excepturi esse, eum voluptates omnis iure
            corrupti autem dicta, facere repellendus deserunt cumque maxime
            nostrum dolorem provident quibusdam magni.
          </h2>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary-light font-hind">
            More Info
          </h1>
          <div className="flex m-2 items-center gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-primary-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <div className="max-w-400px">
              Gd. Graha Pena (Mini Ruko) <br /> Jl. Urip Sumpharjo No. 20
              Makassar
            </div>
          </div>
          <hr className="h-px  bg-secondary-light border-0 " />
          <div className="flex m-2 items-center gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7 text-primary-light"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </svg>
            </div>
            <div className="max-w-400px">+62853 9941 7738</div>
          </div>
          <hr className="h-px  bg-secondary-light border-0 " />
          <div className="flex m-2 items-center gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-8 text-primary-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div className="max-w-400px">Senin - Jumat 09.00-15.00</div>
          </div>
          <hr className="h-px  bg-secondary-light border-0 " />
          <div className="flex m-2 items-center gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div className="max-w-400px">bprshik_mks@yahoo.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;