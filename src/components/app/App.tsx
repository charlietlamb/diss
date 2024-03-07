import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import AppFeature from "./AppFeature";
import { appData, AppData } from "./data/appData";

export default function App() {
  return (
    <div className="flex py-8">
      <BentoGrid className="mx-auto max-w-4xl">
        {appData.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
