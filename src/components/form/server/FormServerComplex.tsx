"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { cookies } from "next/headers";

async function submitForm(formData: FormData) {
  "use server";
  const startTime = performance.now();
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase.from("data").insert({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    type: "server",
  });
  if (error) throw error;
  // toast("Form submitted successfully", { icon: "🚀" });
  // const timeTaken = startTime - performance.now();
  // setTimeout(() => {
  //   toast("Submit time: " + Math.round(timeTaken) + "ms", { icon: "📤" });
  // });
}

export default async function FormServerComplex() {
  return (
    <form action={submitForm} className="flex w-full  flex-col gap-4">
      <div className="flex flex-col gap-y-2">
        <Label>Name</Label>
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

      <Button
        className="rounded-md bg-cyan-700 px-4 py-2 text-zinc-200 transition-all hover:bg-cyan-500"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
