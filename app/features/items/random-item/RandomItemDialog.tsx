"use client";

import { useEffect, useState } from "react";
import { Item } from "../../../lib/model/item.model";
import {
  addNotificationToDb,
  updateScoreInDb,
  updateStockInDb,
} from "../../../server-actions/score-actions";
import { selectScore, setScore } from "../../score/score.slice";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { RANDOM_ITEM_PRICE } from "./RandomItem";
import { AirTableNotification } from "@/app/lib/model/notification.model";

interface RandomItemDialogProps {
  items: Item[];
  onClose: () => void;
}

const RandomItemDialog: React.FC<RandomItemDialogProps> = ({
  items,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const score = useAppSelector(selectScore);

  const pickRandomItem = (currentItem: Item | undefined) => {
    const itemOptions = items.reduce((acc: Item[], item) => {
      if (item === currentItem) return acc;
      const itemOptions = Array(item.stock).fill(item);
      return [...acc, ...itemOptions];
    }, []);
    return itemOptions[Math.floor(Math.random() * itemOptions.length)];
  };

  const [selectedItem, setSelectedItem] = useState<Item>(
    pickRandomItem(undefined),
  );

  const [itemSelectionStopped, setItemSelectionStopped] =
    useState<boolean>(false);

  const stopItemSelection = async () => {
    setItemSelectionStopped(true);
    const newScore = score - RANDOM_ITEM_PRICE;
    await updateScoreInDb(newScore);
    await updateStockInDb(selectedItem.id, selectedItem.stock - 1);
    const notification: AirTableNotification = {
      content: `Vidal veut : "${selectedItem.name}"`,
      read: false,
    };
    await addNotificationToDb(notification);
    dispatch(setScore(newScore));
  };

  useEffect(() => {
    if (!itemSelectionStopped) {
      const interval = setInterval(() => {
        setSelectedItem(pickRandomItem(selectedItem));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [itemSelectionStopped, selectedItem]);

  const goBackToShop = () => {
    onClose();
  };

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center bg-gray-50/50 p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold text-gray-900">
                    Item aléatoire 🙈
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Tu as gagné :</p>
                    <p className="text-sm text-gray-500">
                      {itemSelectionStopped && "🎉 "}
                      {selectedItem.name}
                      {itemSelectionStopped && " 🎉"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {itemSelectionStopped ? (
                <button
                  type="button"
                  data-autofocus
                  onClick={goBackToShop}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm-l shadow-v-clear-purple ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:shadow-sm-l-hover hover:shadow-v-clear-purple sm:mt-0 sm:w-auto"
                >
                  Revenir au shop
                </button>
              ) : (
                <button
                  type="button"
                  data-autofocus
                  onClick={stopItemSelection}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm-l shadow-v-clear-blue ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:shadow-sm-l-hover hover:shadow-v-clear-blue sm:mt-0 sm:w-auto"
                >
                  STOOOOOOOOP !
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomItemDialog;
