import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let productReviewId = body.productReviewId;

    if (!productReviewId) {
      const newProductReview = await prisma.productReview.create({
        data: { title: "Default Review" },
      });
      productReviewId = newProductReview.id;
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
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
              (price: { store: string; price: string; link: string }) => ({
                store: price.store,
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
        productReviewId,
        specs: body.specs
          ? {
              create: {
                coolingArea: body.specs.coolingArea,
                coolingCapacity: body.specs.coolingCapacity,
                CEER: body.specs.CEER,
                dimensions: body.specs.dimensions,
                type: body.specs.type,
              },
            }
          : undefined,
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
    const products = await prisma.product.findMany();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
