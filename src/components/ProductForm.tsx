"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset } = useForm<ProductFormData>();

  interface ProductFormData {
    name: string;
    description: string;
    videoReview?: string;
    images?: string;
    price?: string;
    link?: string;
    pros?: string;
    cons?: string;
    technologies?: string;
    coolingArea?: string;
    coolingCapacity?: string;
    CEER?: string;
    dimensions?: string;
    type?: string;
  }

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          videoReview: data.videoReview || null,
          images: data.images
            ? [{ src: data.images, alt: "Product Image" }]
            : [],
          prices: data.price
            ? [{ store: "Online Store", price: data.price, link: data.link }]
            : [],
          pros: data.pros ? data.pros.split(",") : [],
          cons: data.cons ? data.cons.split(",") : [],
          technologies: data.technologies ? [{ name: data.technologies }] : [],
          specs: {
            coolingArea: data.coolingArea,
            coolingCapacity: data.coolingCapacity,
            CEER: data.CEER,
            dimensions: data.dimensions,
            type: data.type,
          },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Product added successfully!");
        reset();
        setShowForm(false);
      } else {
        setMessage(result.error || "Error adding product");
      }
    } catch {
      setMessage("Error: Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          + Thêm sản phẩm
        </button>
      )}

      {showForm && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-4">Thêm sản phẩm</h2>

          {message && (
            <p className="mb-4 text-center text-green-600">{message}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name", { required: true })}
              placeholder="Tên sản phẩm"
              className="w-full border p-2 rounded text-white"
              required
            />

            <textarea
              {...register("description", { required: true })}
              placeholder="Mô tả sản phẩm"
              className="w-full border p-2 rounded text-white"
              required
            />

            <input
              {...register("videoReview")}
              placeholder="URL video"
              className="w-full border p-2 rounded text-white"
            />

            <input
              {...register("images")}
              placeholder="URL ảnh"
              className="w-full border p-2 rounded text-white"
            />

            <input
              {...register("price")}
              placeholder="Giá"
              className="w-full border p-2 rounded text-white"
            />

            <input
              {...register("link")}
              placeholder="Link cửa hàng"
              className="w-full border p-2 rounded text-white"
            />

            <input
              {...register("pros")}
              placeholder="Ưu điểm (cách nhau bởi dấu phẩy)"
              className="w-full border p-2 rounded text-white"
            />

            <input
              {...register("cons")}
              placeholder="Nhược điểm (cách nhau bởi dấu phẩy)"
              className="w-full border p-2 rounded text-white"
            />

            <input
              {...register("technologies")}
              placeholder="Công nghệ (VD: Chip A17)"
              className="w-full border p-2 rounded text-white"
            />

            <h3 className="text-lg font-semibold">Thông số kỹ thuật</h3>

            <input
              {...register("coolingArea")}
              placeholder="Diện tích làm mát"
              className="w-full border p-2 rounded text-white"
            />
            <input
              {...register("coolingCapacity")}
              placeholder="Công suất làm mát"
              className="w-full border p-2 rounded text-white"
            />
            <input
              {...register("CEER")}
              placeholder="Hiệu suất CEER"
              className="w-full border p-2 rounded text-white"
            />
            <input
              {...register("dimensions")}
              placeholder="Kích thước"
              className="w-full border p-2 rounded text-white"
            />
            <input
              {...register("type")}
              placeholder="Loại sản phẩm"
              className="w-full border p-2 rounded text-white"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Thêm sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
