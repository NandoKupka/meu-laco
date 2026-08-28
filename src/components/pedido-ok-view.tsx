"use client";

import { useSearchParams } from "next/navigation";

import { PedidoOk } from "@/components/pedido-ok";

export function PedidoOkView() {
  const params = useSearchParams();

  return (
    <PedidoOk
      numero={params.get("numero") ?? undefined}
      slug={params.get("slug") ?? undefined}
      nome={params.get("nome") ?? undefined}
      cidade={params.get("cidade") ?? undefined}
    />
  );
}
