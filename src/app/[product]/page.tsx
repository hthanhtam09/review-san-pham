"use client";

import { IProductReview } from "@/types/product";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";

const ProductReview = dynamic(
  () => import("@/components/ProductPreview").then((res) => res.default),
  {
    ssr: false,
  }
);

const data: IProductReview[] = [
  {
    title: "the best apple presidents day deals 2025",
    products: [
      {
        name: "LG LW1517IVSM Window Air Conditioner",
        images: [
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1681158172-41lwRRYwjL._SL500_.jpg",
            alt: "Image 1",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg?crop=0.696xw:0.522xh;0.141xw,0.244xh&resize=980:*",
            alt: "Image 2",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626118911-41lBnCT3DBL._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
            alt: "Image 3",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1681158172-41lwRRYwjL._SL500_.jpg",
            alt: "Image 1",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg?crop=0.696xw:0.522xh;0.141xw,0.244xh&resize=980:*",
            alt: "Image 2",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626118911-41lBnCT3DBL._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
            alt: "Image 3",
          },
        ],
        description:
          "A high-performance window air conditioner designed for large rooms. Features a dual inverter compressor for energy efficiency and a quiet operation, along with Wi-Fi connectivity for remote control.",
        prices: [
          { store: "Amazon", price: "$610", link: "#" },
          { store: "Walmart", price: "$600", link: "#" },
          { store: "Lowe’s", price: "$553", link: "#" },
        ],
        pros: [
          "Wi-Fi enabled",
          "Insulation panels included",
          "Quiet operation",
        ],
        cons: ["Control app needs an update"],
        technologies: [
          "Inverter Technology",
          "Smart ThinQ App",
          "Dual Inverter Compressor",
        ],
        specs: {
          "Cooling Area": "800 sq ft",
          "Cooling Capacity": "14,000 BTU",
          CEER: "14.7",
          Dimensions: "23.5 x 29 x 15 in.",
          Type: "Window",
        },
        videoReview: "https://www.youtube.com/watch?v=gdUGMHIdygo",
      },
      {
        name: "Frigidaire FFRE123WAE Window Air Conditioner",
        images: [
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1654697674-31JcokXn5hS._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
            alt: "Image 1",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1651177036-71b-31whihl-ac-sl1500-1651177026.jpg?crop=0.838xw:1.00xh;0.0881xw,0&resize=980:*",
            alt: "Image 2",
          },
          {
            src: "https://hips.hearstapps.com/hmg-prod/images/ac-unit-pop146-66450e407aba0.jpg?crop=0.643xw:0.570xh;0.357xw,0.430xh&resize=980:*",
            alt: "Image 3",
          },
        ],
        description:
          "A reliable and energy-efficient window AC unit with multiple cooling speeds and an energy-saving mode. Ideal for medium-sized rooms, it comes with a remote control for convenient operation.",
        prices: [
          { store: "Amazon", price: "$470", link: "#" },
          { store: "Walmart", price: "$460", link: "#" },
        ],
        pros: ["Energy-efficient", "Remote control included"],
        cons: ["No Wi-Fi connectivity"],
        technologies: ["Eco Mode", "Energy Star Certified", "Multi-Speed Fan"],
        specs: {
          "Cooling Area": "550 sq ft",
          "Cooling Capacity": "12,000 BTU",
          CEER: "12.0",
          Dimensions: "19 x 21.5 x 14.5 in.",
          Type: "Window",
        },
        videoReview: "https://www.youtube.com/watch?v=example2",
      },
      {
        name: "Midea U Inverter Window Air Conditioner",
        images: [
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1681158172-41lwRRYwjL._SL500_.jpg",
            alt: "Image 1",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg?crop=0.696xw:0.522xh;0.141xw,0.244xh&resize=980:*",
            alt: "Image 2",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626118911-41lBnCT3DBL._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
            alt: "Image 3",
          },
        ],
        description:
          "A unique U-shaped design allows for quiet operation and better window sealing. Energy-efficient with smart control features.",
        prices: [
          { store: "Amazon", price: "$430", link: "#" },
          { store: "Best Buy", price: "$420", link: "#" },
        ],
        pros: ["Ultra-quiet operation", "Smart control via app"],
        cons: ["Difficult installation"],
        technologies: ["Inverter Technology", "Wi-Fi Enabled", "Smart Control"],
        specs: {
          "Cooling Area": "550 sq ft",
          "Cooling Capacity": "10,000 BTU",
          CEER: "15.0",
          Dimensions: "19 x 21 x 14 in.",
          Type: "Window",
        },
        videoReview: "https://www.youtube.com/watch?v=example3",
      },
      {
        name: "GE Profile ClearView PHC08LY Window AC",
        images: [
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1681158172-41lwRRYwjL._SL500_.jpg",
            alt: "Image 1",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg?crop=0.696xw:0.522xh;0.141xw,0.244xh&resize=980:*",
            alt: "Image 2",
          },
          {
            src: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626118911-41lBnCT3DBL._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
            alt: "Image 3",
          },
        ],
        description:
          "A sleek and modern window AC with ultra-quiet operation and Wi-Fi control, designed for small to medium rooms.",
        prices: [
          { store: "Amazon", price: "$490", link: "#" },
          { store: "Walmart", price: "$480", link: "#" },
        ],
        pros: ["Quiet operation", "Smart home integration"],
        cons: ["Limited cooling capacity"],
        technologies: ["Ultra-Quiet Tech", "Smart HQ App", "Energy Saver Mode"],
        specs: {
          "Cooling Area": "350 sq ft",
          "Cooling Capacity": "8,000 BTU",
          CEER: "11.8",
          Dimensions: "18 x 22 x 13 in.",
          Type: "Window",
        },
        videoReview: "https://www.youtube.com/watch?v=example5",
      },
    ],
  },
];

const ProductPage = () => {
  const { product: productName } = useParams();

  const category = data.find(
    (category) =>
      category.title.toLowerCase().replace(/\s+/g, "-") === productName
  );

  if (!category) {
    return <p className="text-center text-gray-500">Sản phẩm không tồn tại.</p>;
  }

  const filteredCategory: IProductReview = {
    title: category.title,
    products: category.products,
  };

  return <ProductReview data={filteredCategory} />;
};

export default ProductPage;
