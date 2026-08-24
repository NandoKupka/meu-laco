import type { Metadata } from "next";

import { Catalogo } from "@/components/catalogo";

export const metadata: Metadata = {
  title: "Já sei o laço",
};

export default function LacosPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Catalogo />
    </div>
  );
}
