import Image from "next/image";
import React from "react";
interface ItemType {
  img: string;
  name: string;
  description: string;
}
interface PropsType {
  item: ItemType;
  key: number;
}

function AdminCardProduct(props: PropsType) {
  return (
    <div className="bg-secondary-dark  m-2">
      <div className="flex">
        <div className="w-3/12">
          <Image
            src={props.item.img}
            alt={props.item.name}
            layout="responsive"
            width={500}
            height={500}
          />
        </div>
        <div>
          <h3>{props.item.name}</h3>
          <h3>{props.item.description}</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminCardProduct;
