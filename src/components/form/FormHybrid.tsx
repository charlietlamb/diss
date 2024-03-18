"use client";

import { MouseEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

export default function FormHybrid() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loadTime, setLoadTime] = useState(0);
  const supabase = createClientComponentClient<Database>();
  async function submitButton() {
    console.log("clicked");
    if (!name || !email || !message)
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

  useEffect(() => {
    const endTime = performance.now();
    const timeTaken = endTime - loadTime;
    toast("Initial load time: " + Math.round(timeTaken) + "ms", { icon: "🕰" });
  }, [loadTime]);

  return (
    <div className="relative z-50 flex  flex-col  gap-y-4 rounded-lg  px-4 py-8">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
        Hybrid Form
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
