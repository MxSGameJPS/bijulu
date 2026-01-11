import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import sharp from "sharp";

function serializeData(data: any) {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    await prisma.produto.delete({
      where: { id: BigInt(id) },
    });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const formData = await request.formData();

    // Extract fields
    const nome = formData.get("nome") as string;
    const quantidadeEstoque = formData.get("quantidadeEstoque")
      ? parseInt(formData.get("quantidadeEstoque") as string)
      : undefined;
    const precisaReposicao = formData.has("precisaReposicao")
      ? formData.get("precisaReposicao") === "true"
      : undefined;
    const categoriaId = formData.get("categoriaId")
      ? BigInt(formData.get("categoriaId") as string)
      : undefined;
    const lojaId = formData.get("lojaId")
      ? BigInt(formData.get("lojaId") as string)
      : undefined;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = undefined; // undefined means "do not update" in Prisma update

    // Handle Image Upload if provided
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

      const fileName = `${Date.now()}_${imageFile.name.split(".")[0]}.webp`;

      const { error } = await supabaseAdmin.storage
        .from("produtos")
        .upload(fileName, webpBuffer, {
          contentType: "image/webp",
          upsert: false,
        });

      if (error) {
        console.error("Supabase Storage Error:", error);
        throw new Error("Failed to upload image");
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("produtos")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const updatedProduct = await prisma.produto.update({
      where: { id: BigInt(id) },
      data: {
        nome,
        quantidadeEstoque,
        precisaReposicao,
        categoriaId,
        lojaId,
        ...(imageUrl && { imagemUrl: imageUrl }), // Only update if new image
      },
    });

    return NextResponse.json(serializeData(updatedProduct));
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}
