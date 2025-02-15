import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ModalListImage } from "./ModalListImage";

interface ImageGalleryProps {
  imagesGallery: { src: string; alt: string }[];
}

export const ImageGallery = ({ imagesGallery }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  const handleOnClicked = (src: string, index: number) => {
    setSelectedImage(src);
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    const nextIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedImage(images[nextIndex].src as string);
    setSelectedIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedImage(images[prevIndex].src as string);
    setSelectedIndex(prevIndex);
  };

  useEffect(() => {
    setImages(imagesGallery);
  }, [imagesGallery]);

  return (
    <div className="flex justify-start gap-4 overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          width={200}
          height={200}
          priority
          className="border-4 border-solid border-gray-500 hover:border-gray-950 cursor-pointer"
          onClick={() => handleOnClicked(image.src as string, index)}
        />
      ))}

      {selectedImage && (
        <ModalListImage
          images={images}
          selectedImage={selectedImage}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrev={handlePrev}
          selectedIndex={selectedIndex}
        />
      )}
    </div>
  );
};
