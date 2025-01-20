import Image from "next/image";
import CountdownTimer from "../ui/CountdownTimer";

import * as React from "react";

interface NotOpenShopProps {
  openDate: Date;
}

const NotOpenShop: React.FC<NotOpenShopProps> = ({ openDate }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#0E131F] text-white">
      <Image
        src="/v-shop-logo.png"
        alt="V-Shop logo"
        width={400}
        height={38}
        priority
      />
      <div className="pt-10">
        <p className="mb-5 ml-1">Ouvre dans :</p>
        <CountdownTimer date={openDate} />
      </div>
    </main>
  );
};

export default NotOpenShop;
