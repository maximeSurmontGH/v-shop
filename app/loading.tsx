import Image from "next/image";

export default function Loading() {
  return (
    <main className="w[400px] flex h-screen flex-col items-center justify-center bg-v-blue text-white">
      <Image
        src="/v-shop-logo.webp"
        alt="V-Shop logo"
        className="animate-pulse"
        width={400}
        height={38}
        priority
      />
    </main>
  );
}
