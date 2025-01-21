"use client";

import Image from "next/image";

import * as React from "react";

export interface ItemRowProps {
  name: string;
  price: number;
  stock: number;
}

const ItemRow: React.FC<ItemRowProps> = ({ name, price, stock }) => {
  const buy = () => {
    console.log("Not implemented.");
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
        className={`rounded-full bg-slate-800 p-2 text-white ${stock === 0 ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={stock === 0}
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
