"use client";

import Image from "next/image";
import { ItemRowProps } from "./ItemRow";

import * as React from "react";
import RandomItemDialog from "./RandomItemDialog";
import { useState } from "react";

export interface RandomItemRowProps {
  items: ItemRowProps[];
}

const RandomItemRow: React.FC<RandomItemRowProps> = ({ items }) => {
  const itemsInStock = items.filter((item) => item.stock > 0);

  const itemsPrice = itemsInStock.reduce(
    (acc, item) => acc + item.price * item.stock,
    0,
  );
  const itemsCount = itemsInStock.reduce((acc, item) => acc + item.stock, 0);

  const averageItemPrice = itemsPrice / itemsCount;

  // arrondir à la centaine supérieure
  const averageItemPriceRounded = Math.ceil(averageItemPrice / 100) * 100;

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
          className="rounded-full bg-slate-800 p-2 text-white"
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
        <RandomItemDialog items={itemsInStock} onClose={handleDialogClose} />
      )}
    </div>
  );
};

export default RandomItemRow;
