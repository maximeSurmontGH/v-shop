import OpenShop from "./page/OpenShop";
import NotOpenShop from "./page/NotOpenShop";

const openDate = new Date(2025, 1, 1, 15, 0, 0);
const nowDate = new Date();

export default function Home() {
  return nowDate > openDate ? (
    <OpenShop />
  ) : (
    <NotOpenShop openDate={openDate} />
  );
}
