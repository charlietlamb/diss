import AppProvider from "@/components/app/AppProvider";
import Complexity from "@/components/complexity/Complexity";
import Developer from "@/components/developer/Developer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-grow gap-y-4 overflow-y-auto bg-zinc-950">
      <AppProvider>
        <Complexity />
        <Developer />
        {children}
      </AppProvider>
    </div>
  );
}
