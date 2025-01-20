import Image from "next/image";
import ScoreCounter from "../ui/ScoreCounter";

import * as React from "react";

const OpenShop: React.FC<object> = ({}) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#0E131F] text-white">
      <Image
        src="/v-shop-logo.png"
        alt="V-Shop logo"
        width={200}
        height={50}
        priority
      />

      <div className="mt-10">
        <ScoreCounter score={10} />
      </div>
    </main>
  );
};

export default OpenShop;
