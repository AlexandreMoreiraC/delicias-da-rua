import React, { useState } from "react";

export default function UploadImage({ onUpload }) {
  const [imageUrl, setImageUrl] = useState("");

  async function handleUpload(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dliyfpqqu/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    setImageUrl(data.secure_url);
    if (onUpload) onUpload(data.secure_url);
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {imageUrl && (
        <div>
          <p>Imagem enviada:</p>
          <img src={imageUrl} alt="Uploaded" width="200" />
          <p>URL:</p>
          <code>{imageUrl}</code>
        </div>
      )}
    </div>
  );
}
