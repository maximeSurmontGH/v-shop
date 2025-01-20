import Image from "next/image";
import CountdownTimer from "./ui/CountdownTimer";

const openDate = new Date(2025, 1, 1, 15, 0, 0);
const nowDate = new Date();

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#0E131F] text-white">
      <Image
        src="/v-shop-logo.png"
        alt="V-Shop logo"
        width={400}
        height={38}
        priority
      />

      {nowDate > openDate ? (
        <p className="mt-5 text-3xl">Le magasin est ouvert</p>
      ) : (
        <div className="pt-10">
          <p className="mb-5 ml-1">Ouvre dans :</p>
          <CountdownTimer date={openDate} />
        </div>
      )}
    </main>
  );
}
