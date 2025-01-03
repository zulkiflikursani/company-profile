export interface JsonData {
  logo: { imgurl: string };
  aboutUs: {
    title: string;
    description: string;
  };
  visiMisi: {
    title: string;
    visi: string[];
    misi: string[];
  };
  footercontent: {
    description: string;
  };
  susunanPengurus: {
    title: string;
    pengurus: {
      img: string;
      name: string;
      position: string;
    }[];
  };
  products: {
    title: string;
    description: string;
    products: {
      img: string;
      name: string;
      description: string;
    }[];
  };
  moreinfo: {
    alamat: string;
    nohp: string;
    "jam-operasi": string;
    email: string;
  };
}
