import Hero from "@/components/hero/Hero";
import NavBar from "@/components/nav/NavBar";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white  bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <NavBar></NavBar>
      <Hero></Hero>
    </div>
  );
}
