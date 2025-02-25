import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        videoReview: body.videoReview || null,
        images: {
          create:
            body.images?.map((img: { src: string; alt: string }) => ({
              src: img.src,
              alt: img.alt,
            })) || [],
        },
        prices: {
          create:
            body.prices?.map(
              (price: {
                store: string;
                storeName: string;
                price: string;
                link: string;
              }) => ({
                store: price.store,
                storeName: price.storeName || "Unknown",
                price: price.price,
                link: price.link,
              })
            ) || [],
        },
        pros: body.pros || [],
        cons: body.cons || [],
        technologies: {
          create:
            body.technologies?.map((tech: { name: string }) => ({
              name: tech.name,
            })) || [],
        },
        specifications: {
          create:
            body.specifications?.map(
              (spec: { key: string; value: string }) => ({
                key: spec.key,
                value: spec.value,
              })
            ) || [],
        },
        productReviewId: body._id,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Error inserting product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        prices: true,
        technologies: true,
        specifications: true,
      },
    });

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
