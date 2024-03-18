"use client";

import React from "react";
import EarthContour from "./EarthContour";

export default function DataClient() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="relative z-50 w-full bg-gradient-to-b from-zinc-300 to-zinc-400 bg-clip-text text-center text-6xl font-bold text-transparent">
        Client Data
      </h1>
      <EarthContour />
    </div>
  );
}
