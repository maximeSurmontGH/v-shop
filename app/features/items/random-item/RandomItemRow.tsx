"use client";

import Image from "next/image";
import RandomItemDialog from "./RandomItemDialog";
import { useEffect, useState } from "react";
import { selectScore } from "../../score/score.slice";
import { useAppSelector } from "../../../lib/hooks";
import { selectItems } from "../items.slice";

export const RANDOM_ITEM_PRICE = 1000;

const RandomItemRow: React.FC<object> = () => {
  const score = useAppSelector(selectScore);
  const items = useAppSelector(selectItems);

  const itemsInStock = items.filter((item) => item.stock > 0);

  const [canBuy, setCanBuy] = useState<boolean>(
    Boolean(itemsInStock.length > 0 && score >= RANDOM_ITEM_PRICE),
  );

  useEffect(() => {
    setCanBuy(Boolean(itemsInStock.length > 0 && score >= RANDOM_ITEM_PRICE));
  }, [score, itemsInStock]);

  const [displayDialog, setDisplayDialog] = useState(false);

  const buy = () => {
    setDisplayDialog(!displayDialog);
  };

  const handleDialogClose = () => {
    setDisplayDialog(false);
  };

  return (
    <div>
      <button
        onClick={buy}
        className={`shadow-v-clear-purple shadow-md-l hover:shadow-v-clear-purple hover:shadow-md-l-hover flex w-full flex-row items-center justify-between rounded-lg bg-white p-1 hover:bg-gray-200 ${!canBuy ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={!canBuy}
      >
        <span className="mx-5 text-slate-800">Tente ta chance 🙈</span>

        <div className="rounded-full bg-slate-800 p-2 text-white drop-shadow-lg">
          <span className="ml-5 flex flex-row items-center">
            <span className="mr-1 font-bold">{RANDOM_ITEM_PRICE}</span>
            <Image
              src="/v-bucks.webp"
              alt="V-Bucks icon"
              width={25}
              height={25}
              priority
            />
          </span>
        </div>
      </button>
      {displayDialog && (
        <RandomItemDialog items={itemsInStock} onClose={handleDialogClose} />
      )}
    </div>
  );
};

export default RandomItemRow;
