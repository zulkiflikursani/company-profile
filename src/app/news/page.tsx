import React, { Suspense } from "react";
import NewsContent from "../component/NewsContent";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsContent />
    </Suspense>
  );
}

export default page;
