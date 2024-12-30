import React from "react";
import UpdatePublish from "./UpdatePublish";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <UpdatePublish params={{ id: id }} />
    </div>
  );
}

export default page;
