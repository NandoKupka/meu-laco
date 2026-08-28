import { Suspense } from "react";
import type { Metadata } from "next";

import { PedidoOkView } from "@/components/pedido-ok-view";

export const metadata: Metadata = {
  title: "Pedido fechado",
};

export default function PedidoOkPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Suspense>
        <PedidoOkView />
      </Suspense>
    </div>
  );
}
