"use client";

import { useState } from "react";
import { Save, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { supabase } from "../../../../lib/supabaseClient";

export default function CategoryForm({ category, action }) {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(category?.imagemUrl || null);
  const [imageUrl, setImageUrl] = useState(category?.imagemUrl || "");
  const [saving, setSaving] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setImagePreview(URL.createObjectURL(file));

    try {
      let processedFile = file;

      // 1. Converter HEIC
      if (
        file.type === "image/heic" ||
        file.name.toLowerCase().endsWith(".heic")
      ) {
        const heic2any = (await import("heic2any")).default;
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.8,
        });
        processedFile = new File(
          [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
          file.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        );
      }

      // 2. Comprimir
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
        fileType: "image/webp",
      };

      const compressedFile = await imageCompression(processedFile, options);

      // 3. Upload Supabase
      const fileName = `cat-${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.webp`;

      const { data, error } = await supabase.storage
        .from("categorias")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // 4. URL Pública
      const { data: publicData } = supabase.storage
        .from("categorias")
        .getPublicUrl(fileName);

      setImageUrl(publicData.publicUrl);
      setImagePreview(publicData.publicUrl);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao processar imagem.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSaving(true);

    // Se for novo e não tiver imagem (opcional, mas bom ter check)
    // Para categoria, imagem pode ser opcional dependendo da regra,
    // mas se o usuário pediu upload, provavelmente quer imagem.
    // Vamos deixar opcional mas avisar se não tiver? Não, vamos seguir a logica, se tiver imageUrl manda.

    await action(formData);
    setSaving(false);
  };

  return (
    <form
      action={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      {category && (
        <input type="hidden" name="id" value={category.id.toString()} />
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
          Nome da Categoria *
        </label>
        <input
          type="text"
          name="nomeCategoria"
          required
          defaultValue={category?.nomeCategoria || ""}
          placeholder="Ex: Brincos"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#1a1a1a",
            color: "white",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
          Descrição
        </label>
        <textarea
          name="descricaoCategoria"
          rows="3"
          defaultValue={category?.descricaoCategoria || ""}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #444",
            background: "#1a1a1a",
            color: "white",
            resize: "vertical",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
          Imagem da Categoria
        </label>

        <div
          style={{
            border: "2px dashed #444",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            background: "#1a1a1a",
            position: "relative",
          }}
        >
          <input
            type="file"
            accept="image/*,.heic"
            onChange={handleImageChange}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />
          {uploading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                color: "#fa90f0",
              }}
            >
              <Loader2 className="animate-spin" /> Processando...
            </div>
          ) : imagePreview ? (
            <div
              style={{ position: "relative", width: "100%", height: "150px" }}
            >
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <div
              style={{
                color: "#aaa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <ImageIcon size={32} />
              <span>Clique para enviar foto</span>
            </div>
          )}
        </div>
        <input type="hidden" name="imagemUrl" value={imageUrl} />
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={uploading || saving}
        style={{
          backgroundColor: uploading ? "#555" : "#fa90f0",
          color: "white",
          padding: "1rem",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          marginTop: "1rem",
          cursor: uploading ? "not-allowed" : "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "1rem",
        }}
      >
        {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
        {saving ? "Salvando..." : "Salvar Categoria"}
      </button>
    </form>
  );
}
