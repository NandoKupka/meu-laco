import type { Metadata } from "next";

import { Quiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "Me ajuda a escolher",
};

export default function EscolherPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Quiz />
    </div>
  );
}
