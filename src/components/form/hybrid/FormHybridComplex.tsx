"use client";

import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { File } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function FormHybridComplex() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [previewImage2, setPreviewImage2] = useState<string | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [previewImage3, setPreviewImage3] = useState<string | null>(null);
  const [loadTime, setLoadTime] = useState(0);
  const supabase = createClientComponentClient<Database>();
  async function submitButton() {
    console.log("clicked");
    if (!name || !email || !message || !file || !file2 || !file3)
      return toast("Please fill in all fields", { icon: "🚫" });

    const startTime = performance.now();
    const { error } = await supabase
      .from("data")
      .insert({ name, email, message, type: "client" });
    if (error) throw error;
    const { error: fileError } = await supabase.storage
      .from("images")
      .upload(`public/${file.name}`, file, {
        contentType: "image",
      });
    if (fileError) throw fileError;
    const { error: fileError2 } = await supabase.storage
      .from("images")
      .upload(`public/${file2.name}`, file2, {
        contentType: "image",
      });
    if (fileError2) throw fileError2;
    const { error: fileError3 } = await supabase.storage
      .from("images")
      .upload(`public/${file3.name}`, file3, {
        contentType: "image",
      });
    if (fileError3) throw fileError3;
    const timeTaken = performance.now() - startTime;
    toast("Form submitted successfully", { icon: "🚀" });
    setTimeout(() => {
      toast("Submit time: " + Math.round(timeTaken) + "ms", { icon: "📤" });
    }, 1000);
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const minSize = 1 * 1024 * 1024; // 1MB in bytes
    if (file) {
      if (file.size <= minSize) {
        toast("File size should be at least 1MB", { icon: "🔴" });
        return;
      }
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const handleFileChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const minSize = 3 * 1024 * 1024; // 1MB in bytes
    if (file) {
      if (file.size <= minSize) {
        toast("File size should be at least 3MB", { icon: "🔴" });
        return;
      }
      setFile2(file);
      setPreviewImage2(URL.createObjectURL(file));
    }
  };
  const handleFileChange3 = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const minSize = 5 * 1024 * 1024; // 1MB in bytes
    if (file) {
      if (file.size <= minSize) {
        toast("File size should be at least 5MB", { icon: "🔴" });
        return;
      }
      setFile3(file);
      setPreviewImage3(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    const startTime = performance.now();
    setLoadTime(startTime);
  }, []);

  useEffect(() => {
    const endTime = performance.now();
    const timeTaken = endTime - loadTime;
    toast("Initial load time: " + Math.round(timeTaken) + "ms", { icon: "🕰" });
  }, [loadTime]);
  return (
    <div className="relative z-50 flex  flex-grow  flex-col gap-y-4 overflow-y-auto rounded-lg px-4 py-8">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
        Hybrid Form: Complex
      </h1>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Name"
            className="border border-zinc-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email" className="text-zinc-200">
            Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Email"
            className="border border-zinc-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="message" className="text-zinc-200">
            Message
          </Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            placeholder="Message"
            className="border border-zinc-300 p-2"
          ></Textarea>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Small File</Label>
          <div className="flex items-center justify-between gap-x-2">
            <div
              className={cn(
                "relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-700 py-8 transition hover:border-zinc-200",
                file && "bg-green-500/5",
              )}
            >
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => handleFileChange(e)}
              />
              <p>
                {!previewImage
                  ? "Upload File"
                  : `${file ? file.name : "File Uploaded"}: Change File`}
              </p>
              <File />
              <p className="text-zinc-400">Min Size: 1MB</p>
            </div>
            {previewImage && file?.type.includes("image") && (
              <Image
                src={previewImage}
                alt="preview"
                height={1024}
                width={1024}
                className="max-w-[50%] rounded-md border border-zinc-700 transition hover:border-zinc-200"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Medium File</Label>
          <div className="flex items-center justify-between gap-x-2">
            <div
              className={cn(
                "relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-700 py-8 transition hover:border-zinc-200",
                file2 && "bg-green-500/5",
              )}
            >
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => handleFileChange2(e)}
              />
              <p>
                {!previewImage2
                  ? "Upload File"
                  : `${file2 ? file2.name : "File Uploaded"}: Change File`}
              </p>
              <File />
              <p className="text-zinc-400">Min Size: 3MB</p>
            </div>
            {previewImage2 && file2?.type.includes("image") && (
              <Image
                src={previewImage2}
                alt="preview"
                height={1024}
                width={1024}
                className="max-w-[50%] rounded-md border border-zinc-700 transition hover:border-zinc-200"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Large File</Label>
          <div className="flex items-center justify-between gap-x-2">
            <div
              className={cn(
                "relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-700 py-8 transition hover:border-zinc-200",
                file3 && "bg-green-500/5",
              )}
            >
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => handleFileChange3(e)}
              />
              <p>
                {!previewImage3
                  ? "Upload File"
                  : `${file3 ? file3.name : "File Uploaded"}: Change File`}
              </p>
              <File />
              <p className="text-zinc-400">Min Size: 5MB</p>
            </div>
            {previewImage3 && file3?.type.includes("image") && (
              <Image
                src={previewImage3}
                alt="preview"
                height={1024}
                width={1024}
                className="max-w-[50%] rounded-md border border-zinc-700 transition hover:border-zinc-200"
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="rounded-md bg-cyan-700 px-4 py-2 text-zinc-200 transition-all hover:bg-cyan-500"
            onClick={() => submitButton()}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
