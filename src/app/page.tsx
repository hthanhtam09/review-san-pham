"use client";

import dynamic from "next/dynamic";
import Card from "@/components/Card";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleList from "@/components/ArticleList";
import ProductForm from "@/components/ProductForm";
import useCurrentUser from "@/hooks/useCurrentUser";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const deals = [
  {
    id: 1,
    title: "Save 48% Off DeWalt Presidents’ Day Sales 2025",
    author: "Brandon Russell",
    date: "Feb 14, 2025",
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1681158172-41lwRRYwjL._SL500_.jpg",
  },
  {
    id: 2,
    title: "The Best Apple Presidents’ Day Deals 2025",
    author: "Jamie Sorcher",
    date: "Feb 14, 2025",
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626118911-41lBnCT3DBL._SL500_.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
  },
  {
    id: 3,
    title: "Save 54% on Generators for Presidents’ Day",
    author: "Brandon Russell",
    date: "Feb 14, 2025",
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg?crop=0.696xw:0.522xh;0.141xw,0.244xh&resize=980:*",
  },
  {
    id: 4,
    title: "Presidents’ Day TV Sales 2025",
    author: "Mike Epstein",
    date: "Feb 14, 2025",
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg?crop=0.696xw:0.522xh;0.141xw,0.244xh&resize=980:*",
  },
];

const data = {
  featuredArticle: {
    title:
      "Your Consciousness Can Reach Back in Time to Shape the Past, a New Theory Suggests",
    description:
      "In the quantum realm, the past, present, and future blur into a boundless structure. But consciousness may operate on a plane beyond this timeless mist.",
    image:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1681158172-41lwRRYwjL._SL500_.jpg",
  },
  articles: [
    {
      title: "Navy UFO Witnesses Reveal Nimitz Encounter Details",
      author: "Tim McMillan",
      date: "Feb 13, 2025",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg",
    },
    {
      title: "Did Russia Steal America’s Hypersonic Secrets?",
      author: "Sébastien Roblin",
      date: "Feb 13, 2025",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1626118911-41lBnCT3DBL._SL500_.jpg",
    },
    {
      title: "Are We Ready For First Contact With Alien Life?",
      author: "Drew Turney",
      date: "Feb 13, 2025",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg",
    },
    {
      title: "Are We on the Verge of an Arms Race in Space?",
      author: "Ramin Skibba",
      date: "Feb 4, 2025",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1715801154-july-window-air-conditioner-002-66450c291648c.jpg",
    },
  ],
};

export default function Home() {
  const { data: currentUser } = useCurrentUser();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-[10vh]">
        {currentUser && Object.keys(currentUser).length && <ProductForm />}
        <h2 className="text-sm text-gray-500 uppercase tracking-widest">
          Must-Read Stories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <FeaturedArticle {...data.featuredArticle} />
          <ArticleList articles={data.articles} />
        </div>
      </div>
      <div className="mt-[10vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {deals.map((deal) => (
          <Card
            key={deal.id}
            title={deal.title}
            author={deal.author}
            date={deal.date}
            image={deal.image}
          />
        ))}
      </div>
    </div>
  );
}
