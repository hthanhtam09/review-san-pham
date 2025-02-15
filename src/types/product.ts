export interface IProductReview {
  title: string;
  products: Product[];
}

export interface Product {
  name: string;
  images: Image[];
  description: string;
  prices: Price[];
  pros: string[];
  cons: string[];
  technologies: string[];
  specs: Specs;
  videoReview: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Price {
  store: string;
  price: string;
  link: string;
}

export interface Specs {
  "Cooling Area": string;
  "Cooling Capacity": string;
  CEER: string;
  Dimensions: string;
  Type: string;
}
