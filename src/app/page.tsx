"use client";

import dynamic from "next/dynamic";
import Card from "@/components/Card";

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

export default function Home() {
  return (
    <div>
      <Navbar />
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
