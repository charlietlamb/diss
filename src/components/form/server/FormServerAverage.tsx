"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { cookies } from "next/headers";
import { ChangeEvent } from "react";
import Image from "next/image";
import { File } from "lucide-react";

async function submitForm(formData: FormData) {
  "use server";
  const startTime = performance.now();
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase.from("data").insert({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    age: formData.get("age"),
    city: formData.get("city"),
    country: formData.get("country"),
    profession: formData.get("profession"),
    hobby: formData.get("hobby"),
    type: "server",
  });
  if (error) throw error;
  // toast("Form submitted successfully", { icon: "🚀" });
  // const timeTaken = startTime - performance.now();
  // setTimeout(() => {
  //   toast("Submit time: " + Math.round(timeTaken) + "ms", { icon: "📤" });
  // });
}

export default async function FormServerAverage() {
  let file: File | null = null;
  let previewImage: string | null = null;
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file1 = e.target.files[0];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
    if (file1) {
      if (file1.size > maxSize) {
        alert("File size should not exceed 1MB");
        return;
      }
      file = file1;
      previewImage = URL.createObjectURL(file);
    }
  };
  return (
    <form action={submitForm} className="flex w-full  flex-col gap-4">
      <div className="flex flex-col gap-y-2">
        <Label>Name1</Label>
        <Input
          name="name"
          placeholder="Name"
          type="text"
          className="border border-zinc-300 p-2"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          className="border border-zinc-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label>Message</Label>
        <Textarea
          name="message"
          placeholder="Message"
          className="border border-zinc-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label className="text-zinc-200">Age</Label>
        <Input
          type="text"
          name="age"
          placeholder="Age"
          className="border border-zinc-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label className="text-zinc-200">City</Label>
        <Input
          type="text"
          name="city"
          placeholder="City"
          className="border border-zinc-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label className="text-zinc-200">Country</Label>
        <Input
          type="text"
          name="country"
          placeholder="Country"
          className="border border-zinc-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label className="text-zinc-200">Profession</Label>
        <Input
          type="text"
          name="profession"
          placeholder="Profession"
          className="border border-zinc-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label className="text-zinc-200">Hobby</Label>
        <Input
          type="text"
          name="hobby"
          placeholder="Hobby"
          className="border border-zinc-300 p-2"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <Label className="text-zinc-200">Image</Label>
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
      <Button
        className="rounded-md bg-cyan-700 px-4 py-2 text-zinc-200 transition-all hover:bg-cyan-500"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
