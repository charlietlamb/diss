import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-8">
      <div className="max-w-[50%] text-center text-6xl font-bold text-zinc-800">
        Comparing{" "}
        <span className="to-danger bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
          client
        </span>{" "}
        and{" "}
        <span className="to-danger bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
          server
        </span>{" "}
        side rendering using{" "}
        <span className="to-danger bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          Nextjs
        </span>{" "}
      </div>
      <Button
        variant="outline"
        className="border-2 border-zinc-800 bg-zinc-200/50 text-2xl font-semibold text-zinc-700 hover:bg-zinc-200/50"
      >
        Start testing...
      </Button>
    </div>
  );
}
