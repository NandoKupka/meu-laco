import type { Metadata } from "next";

import { PedidoOk } from "@/components/pedido-ok";

export const metadata: Metadata = {
  title: "Pedido fechado",
};

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PedidoOkPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <PedidoOk
        numero={one(params.numero)}
        slug={one(params.slug)}
        nome={one(params.nome)}
        cidade={one(params.cidade)}
      />
    </div>
  );
}
