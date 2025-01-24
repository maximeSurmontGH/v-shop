import type { Metadata } from "next";
import { Joti_One } from "next/font/google";
import "./globals.css";
import StoreProvider from "./lib/StoreProvider";
import {
  AIR_TABLE_URL,
  AIR_TABLE_VIDAL_SCORE_ID,
  AIR_TABLE_HEADERS,
} from "./lib/air-table";
import { AirTableRow } from "./lib/model/air-table.model";
import { AirTableItem, Item } from "./lib/model/item.model";
import { connection } from "next/server";

const DEFAULT_FONT = Joti_One({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "V-Shop",
  description: "V-Shop application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();

  const scoreFetchData = await fetch(
    `${AIR_TABLE_URL}/scores/${AIR_TABLE_VIDAL_SCORE_ID}`,
    {
      headers: AIR_TABLE_HEADERS,
    },
  );
  const scoreRecord: AirTableRow<{ score: number }> =
    await scoreFetchData.json();
  const score: number = scoreRecord.fields.score;

  const itemsFetchData = await fetch(`${AIR_TABLE_URL}/items`, {
    headers: AIR_TABLE_HEADERS,
  });
  const itemsRecords = await itemsFetchData.json();
  const items: Item[] = itemsRecords.records
    .map((record: AirTableRow<AirTableItem>) => ({
      ...record.fields,
      id: record.id,
    }))
    .sort((a: Item, b: Item) => a.price - b.price);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={DEFAULT_FONT.className}>
        <StoreProvider score={score} items={items}>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
