import Image from "next/image";

export function ImageViewer(props: {
  imageName: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
}) {
  const myLoader = ({ src }: { src: string }) => {
    return `/api/imageview/?imageName=${src}`;
  };
  return (
    <Image
      loader={myLoader} // pass myLoader to loader attribute.
      src={props.imageName} // path should be defined inside src attribute.
      alt={props.alt || ""}
      width={props.width}
      height={props.height}
      className={props.className}
    />
  );
}
