import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import sharp from "sharp";

// Helper to handle BigInt serialization
function serializeData(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET() {
  try {
    const products = await prisma.produto.findMany({
      include: {
        categoria: true,
        loja: true,
      },
      orderBy: {
        createdAt: "desc", // Most recent first
      },
    });
    return NextResponse.json(serializeData(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract fields
    const nome = formData.get("nome") as string;
    const quantidadeEstoque = parseInt(
      (formData.get("quantidadeEstoque") as string) || "0"
    );
    const precisaReposicao = formData.get("precisaReposicao") === "true";
    const categoriaId = formData.get("categoriaId")
      ? BigInt(formData.get("categoriaId") as string)
      : null;
    const lojaId = formData.get("lojaId")
      ? BigInt(formData.get("lojaId") as string)
      : null;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = null;

    // Handle Image Upload
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      // Convert to WebP using Sharp
      const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

      const fileName = `${Date.now()}_${imageFile.name.split(".")[0]}.webp`;

      // Use supabaseAdmin to bypass RLS
      const { data, error } = await supabaseAdmin.storage
        .from("produtos")
        .upload(fileName, webpBuffer, {
          contentType: "image/webp",
          upsert: false,
        });

      if (error) {
        console.error("Supabase Storage Error:", error);
        throw new Error("Failed to upload image");
      }

      // Get Public URL
      const { data: publicUrlData } = supabaseAdmin.storage
        .from("produtos")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // Create Product in DB
    const product = await prisma.produto.create({
      data: {
        nome,
        quantidadeEstoque,
        precisaReposicao,
        categoriaId,
        lojaId,
        imagemUrl: imageUrl,
      },
    });

    return NextResponse.json(serializeData(product), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
