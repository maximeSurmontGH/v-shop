import Image from "next/image";
import RandomItemRow from "./features/items/random-item/RandomItemRow";
import ScoreCounter from "./features/score/ScoreCounter";
import ItemRows from "./features/items/list/ItemRows";
import { redirect } from "next/navigation";
import { NOT_OPEN_URL } from "./lib/pages-urls";
import { pause } from "./lib/pause";

export const openDate = new Date(2024, 1, 1, 15, 0, 0);
export const nowDate = new Date();

export default async function Home() {
  if (nowDate < openDate) {
    redirect(NOT_OPEN_URL);
  }

  // just to show off the loading spinner because he is cool
  await pause(3000);

  return (
    <main className="bg-v-blue flex min-h-screen w-screen flex-col items-center p-10 text-sm text-white md:text-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="w[250px]">
          <Image
            src="/v-shop-logo.png"
            alt="V-Shop logo"
            className="animate-pulse"
            width={250}
            height={50}
            priority
          />
        </div>

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
