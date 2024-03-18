import AppProvider from "@/components/app/AppProvider";
import Complexity from "@/components/complexity/Complexity";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow gap-y-4 overflow-y-auto bg-zinc-950">
      <AppProvider>
        <Complexity />
        {children}
      </AppProvider>
    </div>
  );
}
