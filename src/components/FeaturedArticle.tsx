import Image from "next/image";

interface FeaturedArticleProps {
  title: string;
  description: string;
  image: string;
}

export default function FeaturedArticle({
  title,
  description,
  image,
}: FeaturedArticleProps) {
  return (
    <div className="md:col-span-2 cursor-pointer">
      <Image
        src={image}
        alt={title}
        width={900}
        height={500}
        className="w-full h-[400px] object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4 text-white">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
