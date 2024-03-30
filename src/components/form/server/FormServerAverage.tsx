import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { cookies } from "next/headers";
import FromServerClientUpload from "./FromServerClientUpload";
import ServerWrap from "@/components/ServerWrap";

export default async function FormServerAverage() {
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
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/toast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: performance.now() - startTime,
        key: "submit/server/average",
      }),
    });
  }

  const startTime = performance.now();
  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/toast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: performance.now() - startTime,
      key: "forms/server/average",
    }),
  });
  return (
    <ServerWrap>
      <div className="relative z-50 flex  flex-grow  flex-col gap-y-4 overflow-y-auto rounded-lg px-4 py-8">
        <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
          Server Side Form: Average
        </h1>
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
            <FromServerClientUpload />
          </div>
          <Button
            className="rounded-md bg-cyan-700 px-4 py-2 text-zinc-200 transition-all hover:bg-cyan-500"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </ServerWrap>
  );
}
