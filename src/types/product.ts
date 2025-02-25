export interface Product {
  name: string;
  type: string;
  category: string;
  description: string;
  videoReview: string;
  images: Image[];
  prices: Price[];
  specifications: Specification[];
  pros: string[];
  cons: string[];
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

export interface Specification {
  key: string;
  value: string;
}
