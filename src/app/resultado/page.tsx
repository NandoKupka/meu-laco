import { Suspense } from "react";
import type { Metadata } from "next";

import { ResultadoView } from "@/components/resultado-view";

export const metadata: Metadata = {
  title: "O teu laço",
};

export default function ResultadoPage() {
  return (
    <Suspense>
      <ResultadoView />
    </Suspense>
  );
}
