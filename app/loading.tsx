import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-[#0E131F] text-white">
      <Image
        src="/v-shop-logo.png"
        alt="V-Shop logo"
        className="animate-pulse"
        width={400}
        height={38}
        priority
      />
    </main>
  );
}
