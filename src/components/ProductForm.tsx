"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  inputData: string;
}

const parseInput = (input: string): Product => {
  const data = Object.fromEntries(
    input
      .split("\n")
      .map((line) => {
        const [key, ...value] = line.split(":");
        return key && value.length
          ? [key.trim().toLowerCase(), value.join(":").trim()]
          : [];
      })
      .filter(Boolean)
  );

  const baseFields = [
    "name",
    "type",
    "category",
    "description",
    "video",
    "image",
    "price",
    "linkStore",
    "pros",
    "cons",
  ];

  return {
    name: data.name || "",
    type: data.type || "",
    category: data.category || "",
    description: data.description || "",
    videoReview: data.video || "",
    images: data.image ? [{ src: data.image, alt: "Product Image" }] : [],
    prices: data.price
      ? [
          {
            store: "Online Store",
            price: data.price,
            link: data.linkStore || "",
          },
        ]
      : [],
    pros: data.pros?.split(",").map((p: string) => p.trim()) || [],
    cons: data.cons?.split(",").map((c: string) => c.trim()) || [],
    specifications: Object.entries(data)
      .filter(([key]) => !baseFields.includes(key))
      .map(([key, value]) => ({ key, value: String(value) })),
  };
};

export default function ProductForm() {
  const [formState, setFormState] = useState({
    showForm: false,
    loading: false,
    message: "",
  });

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { inputData: "" },
  });

  const handleCancel = () => {
    setFormState((prev) => ({ ...prev, showForm: false }));
    reset();
  };

  const onSubmit = async (formData: FormData) => {
    setFormState((prev) => ({ ...prev, loading: true, message: "" }));

    try {
      const parsedData = parseInput(formData.inputData);
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await response.json();
      setFormState((prev) => ({
        ...prev,
        loading: false,
        message: response.ok
          ? "Sản phẩm đã được thêm thành công!"
          : result.error || "Lỗi khi thêm sản phẩm",
        showForm: response.ok ? false : prev.showForm,
      }));

      if (response.ok) reset();
    } catch {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        message: "Lỗi: Đã xảy ra lỗi",
      }));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {!formState.showForm ? (
        <button
          onClick={() => setFormState((prev) => ({ ...prev, showForm: true }))}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          + Thêm sản phẩm
        </button>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-4">Thêm sản phẩm</h2>

          {formState.message && (
            <p
              className={`mb-4 text-center ${
                formState.message.includes("Lỗi")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {formState.message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
              {...register("inputData", { required: true })}
              placeholder={`Nhập dữ liệu theo mẫu:\nname: ...\ntype: ...\ncategory: ...\ndescription: ...\nVideo: ...\nimage: ...\nprice: ...\nlinkStore: ...\nThông số khác: ...`}
              className="w-full border p-2 rounded text-black h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={formState.loading}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
              >
                {formState.loading ? "Đang lưu..." : "Thêm sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
