"use client";

import Image from "next/image";
import { Item } from "../../lib/model/item.model";
import { useEffect, useState } from "react";
import {
  updateScoreInDb,
  updateStockInDb,
} from "../../server-actions/score-actions";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectScore, setScore } from "../score/score.slice";
import { stockMinusOne } from "./items.slice";

const ItemRow: React.FC<Item> = ({ id, name, price, stock }) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector(selectScore);

  const [canBuy, setCanBuy] = useState<boolean>(
    Boolean(stock && score >= price),
  );

  useEffect(() => {
    setCanBuy(Boolean(stock && score >= price));
  }, [score, stock, price]);

  const buy = async () => {
    if (canBuy) {
      const newScore = score - price;
      await updateScoreInDb(newScore);
      await updateStockInDb(id, stock - 1);
      dispatch(setScore(newScore));
      dispatch(stockMinusOne({ id }));
    }
  };

  return (
    <button
      onClick={buy}
      className={`shadow-v-clear-blue shadow-md-l hover:shadow-v-clear-blue hover:shadow-md-l-hover flex w-full flex-row items-center justify-between rounded-lg bg-white p-1 hover:bg-gray-200 ${!canBuy ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={!canBuy}
    >
      <span className="mx-5 text-slate-800">
        {name}

        {stock > 0 ? (
          <span className="text-v-clear-blue ml-1 text-sm">({stock})</span>
        ) : (
          <span className="text-v-clear-purple ml-1 text-sm">(Épuisé)</span>
        )}
      </span>

      <div className="rounded-full bg-slate-800 p-2 text-white">
        <span className="ml-5 flex flex-row items-center">
          <span className="mr-1 font-bold">{price}</span>
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
  );
};

export default ItemRow;
