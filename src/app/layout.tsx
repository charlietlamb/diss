import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NavBar from "@/components/nav/NavBar";
import StoreProvider from "@/state/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { WebVitals } from "@/components/performance/WebVitals";

export const metadata: Metadata = {
  title: "Charlie Lamb's Project",
  description:
    "Hybrid Rendering Approaches: Combining Client-Side and Server-Side Techniques for Optimal Performance On The Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <div className="relative flex max-h-screen min-h-screen w-full flex-col bg-zinc-950  bg-grid-zinc-200/[0.2] ">
              <div className="pointer-events-none absolute inset-0  flex flex-col items-center justify-center bg-zinc-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
              <NavBar></NavBar>
              {children}
              <Toaster />
              {/* <WebVitals noReport /> */}
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
