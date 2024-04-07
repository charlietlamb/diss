import { usePathname, useRouter } from "next/navigation";
import { methodData } from "./data/methodData";
import { Button } from "../ui/button";

export default function ResultsMethod() {
  const pathname = usePathname();
  const router = useRouter();
  const method = pathname.split("/")[2];
  const render = pathname.split("/")[3];
  const complexity = pathname.split("/")[4];

  return (
    <div className="flex justify-center gap-4">
      {methodData.map((item, i) => (
        <Button
          key={i}
          onClick={() => {
            if (item !== method) {
              router.push(`/results/${item}/${render}/${complexity}`);
              router.refresh();
            }
          }}
        >
          {item === "submit"
            ? "Submissions"
            : item.slice(0, 1).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </div>
  );
}
