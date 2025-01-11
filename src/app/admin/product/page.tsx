import React from "react";
import data from "@/app/config/file-content.json";

import AdminCardProduct from "./AdminCardProduct";
function page() {
  return (
    <div>
      {data.products.products.map((item, index) => (
        <AdminCardProduct key={index} item={item} />
      ))}
    </div>
  );
}

export default page;
