import React, { Suspense } from "react";
import NewsContent from "./NewsContent";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <NewsContent />
      </div>
    </Suspense>
  );
};

export default page;
