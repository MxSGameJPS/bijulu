"use client";

import { Trash2 } from "lucide-react";

export default function DeleteButton({ id, onDeleteAction }) {
  return (
    <form action={onDeleteAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        style={{
          background: "none",
          border: "none",
          color: "#ff6347",
          cursor: "pointer",
          padding: "0.5rem",
        }}
        onClick={(e) => {
          if (
            !confirm(
              "Tem certeza que deseja excluir? Esta ação não pode ser desfeita."
            )
          ) {
            e.preventDefault();
          }
        }}
      >
        <Trash2 size={18} />
      </button>
    </form>
  );
}
