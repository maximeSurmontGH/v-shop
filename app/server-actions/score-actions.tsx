"use server";

import {
  AIR_TABLE_URL,
  AIR_TABLE_VIDAL_SCORE_ID,
  AIR_TABLE_HEADERS,
} from "../lib/air-table";

export const updateScoreInDb = async (newScore: number) => {
  await fetch(`${AIR_TABLE_URL}/scores/${AIR_TABLE_VIDAL_SCORE_ID}`, {
    method: "PATCH",
    headers: AIR_TABLE_HEADERS,
    body: JSON.stringify({ fields: { score: newScore } }),
  });
};

export const updateStockInDb = async (itemId: string, newStock: number) => {
  await fetch(`${AIR_TABLE_URL}/items/${itemId}`, {
    method: "PATCH",
    headers: AIR_TABLE_HEADERS,
    body: JSON.stringify({ fields: { stock: newStock } }),
  });
};

export const setNotificationAsReadInDb = async (notificationId: string) => {
  await fetch(`${AIR_TABLE_URL}/notifications/${notificationId}`, {
    method: "PATCH",
    headers: AIR_TABLE_HEADERS,
    body: JSON.stringify({ fields: { read: true } }),
  });
};
