"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { create } from "domain";
import { File } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function FromServerClientUpload({
  minUpload = false,
  uploadNum = 1,
}: {
  minUpload?: boolean;
  uploadNum?: number;
}) {
  const supabase = createClientComponentClient<Database>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mostRecentFileName, setMostRecentFileName] = useState<string | null>(
    null,
  );
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file1 = e.target.files[0];
    const maxSize = uploadNum * 1024 * 1024; // 1MB in bytes
    if (file1) {
      if (!minUpload) {
        if (file1.size > maxSize) {
          return toast(`File size should not exceed ${uploadNum}MB`, {
            icon: "🔴",
          });
        }
      } else {
        if (file1.size <= maxSize) {
          return toast(`File size should not be less than ${uploadNum}MB`, {
            icon: "🔴",
          });
        }
      }
      setPreviewImage(URL.createObjectURL(file1));
      if (mostRecentFileName)
        supabase.storage.from("images").remove([mostRecentFileName]);
      const { error: imageError } = await supabase.storage
        .from("images")
        .upload(`public/${file1.name}`, file1, {
          contentType: "image",
          upsert: true,
        });
      setMostRecentFileName(`public/${file1.name}`);
      if (imageError) throw imageError;
    }
  };

  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-700 py-8 transition hover:border-zinc-200">
        <input
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={(e) => handleFileChange(e)}
          accept="image/*"
        />
        <p>{!previewImage ? "Upload Image" : "Change Image"}</p>
        <File />
        <p className="text-zinc-400">
          {`${minUpload ? "Min " : "Max "} Size: ${uploadNum}MB`}
        </p>
      </div>
      {previewImage && (
        <Image
          src={previewImage}
          alt="preview"
          height={1024}
          width={1024}
          className="max-w-[50%] rounded-md border border-zinc-700 transition hover:border-zinc-200"
        />
      )}
    </div>
  );
}
