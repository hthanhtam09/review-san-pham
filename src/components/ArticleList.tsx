import ArticleCard from "./ArticleCard";

interface ArticleListProps {
  articles: {
    title: string;
    author: string;
    date: string;
    image: string;
  }[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="flex flex-col gap-4">
      {articles.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  );
}
