"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { ImageGallery } from "./ImageGallery";
import { IProductReview } from "@/types/product";

interface ProductReviewProps {
  data: IProductReview;
}

export default function ProductReview({ data }: ProductReviewProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-5xl font-bold text-white text-center capitalize">
        {data.title}
      </h1>

      {data.products.map((product, index) => (
        <Card key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg">
          <CardContent>
            <div className="flex items-start gap-4">
              {product.images && product.images.length > 0 && (
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  width={100}
                  height={300}
                  className="object-cover rounded-lg"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {product.name}
                </h2>
                <p className="text-white mt-2">{product.description}</p>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              {product.prices.map((p) => (
                <Button key={p.store} asChild>
                  <a className="text-white" href={p.link}>
                    {p.price} at {p.store}
                  </a>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">Pros</h3>
                {product.pros.map((pro) => (
                  <p
                    key={pro}
                    className="flex items-center gap-2 text-white pt-2"
                  >
                    <CheckCircle className="text-green-500" /> {pro}
                  </p>
                ))}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Cons</h3>
                {product.cons.map((con) => (
                  <p
                    key={con}
                    className="flex items-center gap-2 text-white pt-2"
                  >
                    <XCircle className="text-red-500" /> {con}
                  </p>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white mt-4">
              Key Technologies
            </h3>
            <ul className="list-disc list-inside text-white pt-2">
              {product.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-4">
              Key Specs
            </h3>
            <table className="w-full border border-gray-500 mt-2">
              <tbody>
                {Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-500">
                    <td className="p-2 font-medium text-white border-r border-gray-500">
                      {key}
                    </td>
                    <td className="p-2 text-white">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-white my-4">
              Image Gallery
            </h3>
            <ImageGallery imagesGallery={product.images} />

            <h3 className="text-2xl font-semibold text-white my-4">
              Video Review
            </h3>
            <ReactPlayer
              url={product.videoReview}
              controls
              width="100%"
              className="mt-2"
            />
          </CardContent>
        </Card>
      ))}

      <h2 className="text-2xl font-semibold text-white text-center mt-8">
        Comparison Summary
      </h2>
      <table className="w-full border border-gray-500 mt-4">
        <thead>
          <tr className="bg-gray-700 text-white text-left">
            <th className="p-2">Model</th>
            <th className="p-2">Price Range</th>
            <th className="p-2">Cooling Area</th>
            <th className="p-2">CEER</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((product) => (
            <tr
              key={product.name}
              className="border-b border-gray-500 text-white"
            >
              <td className="p-2">{product.name}</td>
              <td className="p-2">
                {product.prices.map((p) => p.price).join(" / ")}
              </td>
              <td className="p-2">{product.specs["Cooling Area"]}</td>
              <td className="p-2">{product.specs.CEER}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
