import Image from "next/image";

interface ArticleCardProps {
  title: string;
  author: string;
  date: string;
  image: string;
}

export default function ArticleCard({
  title,
  author,
  date,
  image,
}: ArticleCardProps) {
  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <Image
        src={image}
        alt={title}
        width={250}
        height={100}
        className="w-[250px] h-[100px] object-cover rounded-md"
      />
      <div>
        <h3 className="text-md font-semibold text-white">{title}</h3>
        <p className="text-xs text-gray-500">
          By {author} • {date}
        </p>
      </div>
    </div>
  );
}
