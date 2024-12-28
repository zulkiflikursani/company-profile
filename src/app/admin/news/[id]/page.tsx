import React from "react";
import UpdateNews from "./UpdateNews";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      {/* {id} */}
      <UpdateNews
        params={{
          id: id,
        }}
      />
    </div>
  );
}

export default page;
