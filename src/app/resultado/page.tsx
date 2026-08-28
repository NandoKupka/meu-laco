import { Suspense } from "react";
import type { Metadata } from "next";

import { ResultadoView } from "@/components/resultado-view";

export const metadata: Metadata = {
  title: "O teu laÃ§o",
};

export default function ResultadoPage() {
  return (
    <Suspense>
      <ResultadoView />
    </Suspense>
  );
}
