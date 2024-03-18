import HeroButton from "./HeroButton";

export default function Hero() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-y-8">
      <div className="heading-gradient max-w-[50%] text-center text-6xl font-bold">
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
      <HeroButton></HeroButton>
    </div>
  );
}
