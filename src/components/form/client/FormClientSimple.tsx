"use client";

import { MouseEvent, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { toast } from "sonner";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setRequests } from "@/state/cache/cacheSlice";

export default function FormClientSimple() {
  const supabase = createClientComponentClient<Database>();
  const { requests } = useAppSelector((state) => state.cache);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  async function submitButton() {
    if (!name || !email || !message)
      return toast("Please fill in all fields", { icon: "🚫" });

    const startTime = performance.now();
    const { error } = await supabase
      .from("data")
      .insert({ name, email, message, type: "client" });
    if (error) throw error;
    const timeTaken = performance.now() - startTime;
    toast("Form submitted successfully", { icon: "🚀" });
    const loadData = {
      method: "submit",
      render: "client",
      complexity: "simple",
      time: timeTaken,
      cached: requests.includes("submit/client/simple"),
    };
    const { error: submitError } = await supabase
      .from("loads")
      .insert(loadData);
    if (submitError) throw submitError;
    if (!loadData.cached) {
      dispatch(setRequests([...requests, "submit/client/simple"]));
    }
    setTimeout(() => {
      toast("Submit time: " + Math.round(timeTaken) + "ms", {
        icon: "📤",
        description: loadData.cached
          ? "This request was previously cached"
          : "This request was not cached",
      });
    }, 1000);
  }

  return (
    <div className="relative z-50 flex  flex-grow  flex-col gap-y-4 overflow-y-auto rounded-lg px-4 py-8">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
        Client Side Form: Simple
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
