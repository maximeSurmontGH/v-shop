"use client";

import { Item } from "../../lib/model/item.model";
import { useEffect, useState } from "react";
import {
  addNotificationToDb,
  updateScoreInDb,
  updateStockInDb,
} from "../../server-actions/score-actions";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { selectScore, setScore } from "../score/score.slice";
import { stockMinusOne, toggleItemLoading } from "./items.slice";
import { AirTableNotification } from "@/app/lib/model/notification.model";
import Image from "next/image";
import Loading from "../loading/Loading";

const ItemComponent: React.FC<Item> = ({ id, name, price, stock, loading }) => {
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
      dispatch(toggleItemLoading({ id }));
      await updateScoreInDb(newScore);
      await updateStockInDb(id, stock - 1);
      const notification: AirTableNotification = {
        content: `Vidal veut : "${name}"`,
        read: false,
      };
      await addNotificationToDb(notification);
      dispatch(setScore(newScore));
      dispatch(stockMinusOne({ id }));
      dispatch(toggleItemLoading({ id }));
    }
  };

  return (
    <button
      onClick={buy}
      className={`flex w-full flex-row items-center justify-between rounded-lg bg-white p-1 shadow-md-l shadow-v-clear-blue hover:bg-gray-200 hover:shadow-md-l-hover hover:shadow-v-clear-blue ${!canBuy ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={!canBuy}
    >
      <span className="mx-1 text-slate-800">
        {name}

        {stock > 0 ? (
          <span className="ml-1 text-sm text-v-clear-blue">({stock})</span>
        ) : (
          <span className="ml-1 text-sm text-v-clear-purple">(Épuisé)</span>
        )}
      </span>

      <div className="rounded-full bg-slate-800 p-2 text-white">
        {loading ? (
          <Loading />
        ) : (
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
        )}
      </div>
    </button>
  );
};

export default ItemComponent;
