import { Item } from "./model/item.model";
import Image from "next/image";
import ItemRow from "./ui/ItemRow";
import RandomItemRow from "./ui/RandomItemRow";
import ScoreCounter from "./ui/ScoreCounter";
import { redirect } from "next/navigation";
import { NOT_OPEN_URL } from "./lib/pages-urls";

export const openDate = new Date(2025, 1, 1, 15, 0, 0);
export const nowDate = new Date();

export default async function Home() {
  if (nowDate < openDate) {
    redirect(NOT_OPEN_URL);
  }

  const score = 349;

  const items: Item[] = [
    {
      name: "Poignée de bonbons",
      price: 100,
      stock: 10,
    },
    {
      name: "Twix",
      price: 200,
      stock: 0,
    },
    {
      name: "Petit paquet de chips",
      price: 350,
      stock: 5,
    },
    {
      name: "Massage des épaules",
      price: 850,
      stock: 5,
    },
    {
      name: "???? ?? ?????",
      price: 9999,
      stock: 1,
    },
  ];

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
