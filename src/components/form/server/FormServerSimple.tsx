import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { cookies } from "next/headers";

const submitForm1 = async (formData: FormData) => {
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
  const timeTaken = performance.now() - startTime;
  const loadData = {
    method: "submit",
    render: "server",
    complexity: "simple",
    time: timeTaken,
    cached: false,
  };
  const { error: submitError } = await supabase.from("loads").insert(loadData);
  if (submitError) throw submitError;
};

export default async function FormServerSimple() {
  return (
    <div className="relative z-50 flex  flex-grow  flex-col gap-y-4 overflow-y-auto rounded-lg px-4 py-8">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-left text-6xl font-bold text-transparent">
        Server Side Form: Simple
      </h1>
      <form action={submitForm1} className="flex w-full flex-col gap-4">
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
    </div>
  );
}
