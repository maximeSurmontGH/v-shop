"use client";

import Image from "next/image";
import { Item } from "../model/item.model";
import { useState } from "react";
import {
  updateScoreInDb,
  updateStockInDb,
} from "../server-actions/score-actions";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { selectScore, setScore } from "../features/score/score.slice";

const ItemRow: React.FC<Item> = ({ id, name, price, stock }) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector(selectScore);

  const [canBuy] = useState<boolean>(Boolean(stock && score >= price));

  const buy = async () => {
    if (canBuy) {
      const newScore = score - price;
      await updateScoreInDb(newScore);
      await updateStockInDb(id, stock - 1);
      dispatch(setScore(newScore));
    }
  };

  return (
    <div className="flex w-full flex-row items-center justify-between rounded-full bg-white p-1">
      <span className="mx-5 text-slate-800">
        {name}

        {stock > 0 ? (
          <span className="ml-1 text-sm text-slate-400">({stock})</span>
        ) : (
          <span className="ml-1 text-sm text-red-400">(Épuisé)</span>
        )}
      </span>

      <button
        onClick={buy}
        className={`rounded-full bg-slate-800 p-2 text-white ${!canBuy ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={!canBuy}
      >
        <span className="ml-5 flex flex-row items-center">
          <span className="mr-1">{price}</span>
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
  );
};

export default ItemRow;
