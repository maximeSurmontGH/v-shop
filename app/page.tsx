import Image from "next/image";
import CountdownTimer from "./ui/CountdownTimer";

const startDate = new Date(2025, 1, 1, 15, 0, 0);

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

      <div className="pt-14">
        <CountdownTimer date={startDate} />
      </div>
    </main>
  );
}
