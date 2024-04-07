import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { strings } from "./data/compareData";
import { useEffect, useState } from "react";
import { useCompareContext } from "./context/compareContext";
import { setCompareData } from "./functions/setCompareData";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DatabaseZap } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionTooltip } from "../ui/ActionToolTip";

export default function CompareSelects() {
  const supabase = createClientComponentClient();
  const {
    data1,
    setData1,
    data2,
    setData2,
    data1Cached,
    setData1Cached,
    data2Cached,
    setData2Cached,
    cache,
  } = useCompareContext();
  const [value1, setValue1] = useState<string>(
    !!data1.length
      ? `${data1[0].method}/${data1[0].render}/${data1[0].complexity}`
      : "",
  );
  const [value2, setValue2] = useState<string>(
    !!data2.length
      ? `${data2[0].method}/${data2[0].render}/${data2[0].complexity}`
      : "",
  );

  useEffect(() => {
    setCompareData(supabase, value1, setData1, !cache ? null : data1Cached);
  }, [value1, data1Cached, cache]);
  useEffect(() => {
    setCompareData(supabase, value2, setData2, !cache ? null : data2Cached);
  }, [value2, data2Cached, cache]);
  return (
    <div className="flex gap-4 p-4">
      <div className="flex w-full gap-2">
        <Select value={value1} onValueChange={setValue1}>
          <SelectTrigger>
            <SelectValue placeholder="Select a test..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {strings.map((string) => (
                <SelectItem key={string} value={string}>
                  {string}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {cache && (
          <ActionTooltip label={!data1Cached ? "Cached?" : "Not Cached?"}>
            <Toggle
              onClick={() => setData1Cached(!data1Cached)}
              className={data1Cached ? "bg-zinc-800" : ""}
            >
              <DatabaseZap className="h-4 w-4" />
            </Toggle>
          </ActionTooltip>
        )}
      </div>
      <div className="flex w-full gap-2">
        <Select value={value2} onValueChange={setValue2}>
          <SelectTrigger>
            <SelectValue placeholder="Select a test..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {strings.map((string) => (
                <SelectItem key={string} value={string}>
                  {string}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {cache && (
          <ActionTooltip label={!data2Cached ? "Cached?" : "Not Cached?"}>
            <Toggle
              onClick={() => setData2Cached(!data2Cached)}
              className={data2Cached ? "bg-zinc-800" : ""}
            >
              <DatabaseZap className="h-4 w-4" />
            </Toggle>
          </ActionTooltip>
        )}
      </div>
    </div>
  );
}
