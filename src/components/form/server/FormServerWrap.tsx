"use client";
import React from "react";
import { useLocalStorage } from "@/components/app/hooks/useLocalStorage";
import FormServer from "./FormServer";
import { useEffect, useState } from "react";
import { Complexity } from "@/state/render/renderSlice";

type ChildProps = {
  complexity: Complexity;
};

type FormServerWrapProps = {
  children: React.ReactElement<ChildProps> | React.ReactElement<ChildProps>[];
};

export default function FormServerWrap({
  children,
}: {
  children: FormServerWrapProps;
}) {
  const stg = useLocalStorage("complexity");
  const complexity = stg.getItem();
  const [serverComplexity, setServerComplexity] = useState<Complexity>(
    complexity ? complexity : "simple",
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "complexity") {
        console.log(e.newValue);
        setServerComplexity((e.newValue as Complexity) || "simple");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<ChildProps>, {
            complexity: serverComplexity,
          })
        : children}
    </>
  );
}
