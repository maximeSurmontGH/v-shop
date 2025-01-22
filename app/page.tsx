import { Item } from "./model/item.model";
import Image from "next/image";
import ItemRow from "./ui/ItemRow";
import RandomItemRow from "./ui/RandomItemRow";
import ScoreCounter from "./ui/ScoreCounter";
import { redirect } from "next/navigation";
import { NOT_OPEN_URL } from "./lib/pages-urls";
import { AirTableRow } from "./model/air-table.model";
import {
  AIR_TABLE_HEADERS,
  AIR_TABLE_URL,
  AIR_TABLE_VIDAL_SCORE_ID,
} from "./lib/air-table";

export const openDate = new Date(2025, 1, 1, 15, 0, 0);
export const nowDate = new Date();

export default async function Home() {
  if (nowDate < openDate) {
    redirect(NOT_OPEN_URL);
  }

  const itemsFetchData = await fetch(`${AIR_TABLE_URL}/items`, {
    headers: AIR_TABLE_HEADERS,
  });
  const itemsRecords = await itemsFetchData.json();
  const items: Item[] = itemsRecords.records
    .map((record: AirTableRow<Item>) => ({
      ...record.fields,
      id: record.id,
    }))
    .sort((a: Item, b: Item) => a.price - b.price);

  const scoreFetchData = await fetch(
    `${AIR_TABLE_URL}/scores/${AIR_TABLE_VIDAL_SCORE_ID}`,
    {
      headers: AIR_TABLE_HEADERS,
    },
  );
  const scoreRecord: AirTableRow<{ score: number }> =
    await scoreFetchData.json();
  const score: number = scoreRecord.fields.score;

  return (
    <main className="flex min-h-screen w-screen flex-col items-center bg-[#0E131F] p-10 text-xl text-white">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/v-shop-logo.png"
          alt="V-Shop logo"
          width={200}
          height={50}
          priority
        />

        <div className="mt-10 flex w-full flex-row justify-end">
          <ScoreCounter score={score} />
        </div>

        <div className="mt-10 w-full">
          {items.map((item, index) => (
            <div className="mt-2" key={index}>
              <ItemRow score={score} {...item} />
            </div>
          ))}
        </div>

        <div className="mt-10 w-full">
          <RandomItemRow score={score} items={items} />
        </div>
      </div>
    </main>
  );
}
