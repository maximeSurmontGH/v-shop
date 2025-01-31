import Image from "next/image";
import Countdown from "@/app/features/count-down/Countdown";
import { HOME_URL } from "@/app/lib/pages-urls";
import { redirect } from "next/navigation";
import { openDate } from "@/app/page";

export default function NotOpenShop() {
  if (new Date() >= openDate) {
    redirect(HOME_URL);
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-v-blue text-white">
      <Image
        src="/v-shop-logo.webp"
        alt="V-Shop logo"
        className="animate-pulse"
        width={400}
        height={38}
        priority
      />
      <div className="pt-10">
        <Countdown date={openDate} />
      </div>
    </main>
  );
}
