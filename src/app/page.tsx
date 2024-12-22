import Aboutus from "./component/Aboutus";

import Hero from "./component/Hero";
import Informasi from "./component/Informasi";
import Products from "./component/Products";

export default function Home() {
  return (
    <div>
      <Hero />
      <Aboutus />
      <Products />
      <Informasi />
    </div>
  );
}
