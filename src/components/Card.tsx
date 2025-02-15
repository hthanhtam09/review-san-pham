import { generateSlug } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  author: string;
  date: string;
  image: string;
}

export default function Card({ title, author, date, image }: CardProps) {
  const router = useRouter();

  const redirectProductPreview = () => {
    const slug = generateSlug(title);
    router.push(slug);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      onClick={redirectProductPreview}
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500 text-sm">
          By {author} • {date}
        </p>
      </div>
    </div>
  );
}
