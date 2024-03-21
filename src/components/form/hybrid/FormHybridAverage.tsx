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
import { decode } from "base64-arraybuffer";

export default function FormHybridAverage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [profession, setProfession] = useState("");
  const [hobby, setHobby] = useState("");
  const [imageData, setImageData] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loadTime, setLoadTime] = useState(0);
  const supabase = createClientComponentClient<Database>();
  async function submitButton() {
    if (
      !name ||
      !email ||
      !message ||
      !age ||
      !city ||
      !country ||
      !profession ||
      !hobby ||
      !imageData ||
      !fileName
    )
      return toast("Please fill in all fields", { icon: "🚫" });

    const startTime = performance.now();
    const { error } = await supabase
      .from("data")
      .insert({ name, email, message, type: "client" });
    if (error) throw error;

    const timeTaken = performance.now() - startTime;
    toast("Form submitted successfully", { icon: "🚀" });
    setTimeout(() => {
      toast("Submit time: " + Math.round(timeTaken) + "ms", { icon: "📤" });
    }, 1000);
  }
  useEffect(() => {
    const startTime = performance.now();
    setLoadTime(startTime);
  }, []);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (file) {
      if (file.size > maxSize) {
        alert("File size should not exceed 1MB");
        return;
      }
      setImageData(file);
      setPreviewImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  useEffect(() => {
    const endTime = performance.now();
    const timeTaken = endTime - loadTime;
    toast("Initial load time: " + Math.round(timeTaken) + "ms", { icon: "🕰" });
  }, [loadTime]);
  return (
    <div className="relative z-50 flex  flex-grow  flex-col gap-y-4 overflow-y-auto rounded-lg px-4 py-8">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
        Hybrid Form: Average
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
          <Label className="text-zinc-200">Age</Label>
          <Input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            name="age"
            placeholder="Age"
            className="border border-zinc-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">City</Label>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder="City"
            className="border border-zinc-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Country</Label>
          <Input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            placeholder="Country"
            className="border border-zinc-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Profession</Label>
          <Input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            name="profession"
            placeholder="Profession"
            className="border border-zinc-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Hobby</Label>
          <Input
            type="text"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            name="hobby"
            placeholder="Hobby"
            className="border border-zinc-300 p-2"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label className="text-zinc-200">Image</Label>
          <div className="flex items-center justify-between gap-x-2">
            <div
              className={cn(
                "relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-700 py-8 transition hover:border-zinc-200",
              )}
            >
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
              />
              <p>{!previewImage ? "Upload Image" : "Change Image"}</p>
              <File />
              <p className="text-zinc-400">Max Size: 1MB</p>
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
