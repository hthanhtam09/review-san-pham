import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ModalListImageProps {
  images: { src: string; alt: string }[];
  selectedImage: string | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  selectedIndex: number;
}

export const ModalListImage = ({
  images,
  selectedImage,
  onClose,
  onNext,
  onPrev,
  selectedIndex,
}: ModalListImageProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    selectedImage && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
        <div
          ref={modalRef}
          className="max-w-screen-lg mx-4 bg-white p-4 rounded-lg shadow-lg relative"
        >
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-lg font-semibold">LightBox</span>
            <button
              className="bg-gray-600 bg-opacity-50 p-2 hover:bg-gray-400 transition-all rounded-full text-white"
              onClick={onClose}
            >
              &#10005;
            </button>
          </div>
          <div className="relative mt-4">
            <button
              className="absolute top-1/2 -translate-y-1/2 left-2 text-white bg-black bg-opacity-50 p-2 rounded-md"
              onClick={onPrev}
            >
              &lt;
            </button>

            <Image
              src={selectedImage}
              alt="Selected"
              width={660}
              height={440}
              className="mx-auto"
            />

            <button
              className="absolute top-1/2 -translate-y-1/2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-md"
              onClick={onNext}
            >
              &gt;
            </button>
          </div>
          <div className="text-center mt-2 text-gray-700 font-semibold">
            Image {selectedIndex + 1} of {images.length}
          </div>
        </div>
      </div>
    )
  );
};
