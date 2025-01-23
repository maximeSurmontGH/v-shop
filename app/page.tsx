import Image from "next/image";
import RandomItemRow from "./features/items/random-item/RandomItemRow";
import ScoreCounter from "./features/score/ScoreCounter";
import ItemRows from "./features/items/list/ItemRows";
import { redirect } from "next/navigation";
import { NOT_OPEN_URL } from "./lib/pages-urls";

export const openDate = new Date(2025, 1, 1, 15, 0, 0);
export const nowDate = new Date();

export default function Home() {
  if (nowDate < openDate) {
    redirect(NOT_OPEN_URL);
  }

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
          <ScoreCounter />
        </div>

        <div className="mt-10 w-full">
          <ItemRows />
        </div>

        <div className="mt-10 w-full">
          <RandomItemRow />
        </div>
      </div>
    </main>
  );
}
