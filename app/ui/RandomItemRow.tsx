"use client";

import Image from "next/image";
import RandomItemDialog from "./RandomItemDialog";
import { useState } from "react";
import { Item } from "../model/item.model";

interface RandomItemRowProps {
  items: Item[];
  score: number;
}

const RandomItemRow: React.FC<RandomItemRowProps> = ({ items, score }) => {
  const itemsInStock = items.filter((item) => item.stock > 0);

  const itemsPrice = itemsInStock.reduce(
    (acc, item) => acc + item.price * item.stock,
    0,
  );
  const itemsCount = itemsInStock.reduce((acc, item) => acc + item.stock, 0);

  const averageItemPrice = itemsPrice / itemsCount;

  // arrondir à la centaine supérieure
  const averageItemPriceRounded = Math.ceil(averageItemPrice / 100) * 100;

  const [canBuy] = useState<boolean>(
    Boolean(itemsInStock.length > 0 && score >= averageItemPriceRounded),
  );

  const [displayDialog, setDisplayDialog] = useState(false);

  const buy = () => {
    setDisplayDialog(!displayDialog);
  };

  const handleDialogClose = () => {
    setDisplayDialog(false);
  };

  return (
    <div>
      <div className="flex w-full flex-row items-center justify-between rounded-full bg-white p-1">
        <span className="mx-5 text-slate-800">Tente ta chance 🙈</span>

        <button
          onClick={buy}
          className={`rounded-full bg-slate-800 p-2 text-white ${!canBuy ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!canBuy}
        >
          <span className="ml-5 flex flex-row items-center">
            <span className="mr-1">{averageItemPriceRounded}</span>
            <Image
              src="/v-bucks.webp"
              alt="V-Bucks icon"
              width={25}
              height={25}
              priority
            />
          </span>
        </button>
      </div>
      {displayDialog && (
        <RandomItemDialog
          items={itemsInStock}
          score={score}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
};

export default RandomItemRow;
