import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { formatPreco, getLaco } from "@/lib/catalog";

export function PedidoOk({
  numero,
  slug,
  nome,
  cidade,
}: {
  numero?: string;
  slug?: string;
  nome?: string;
  cidade?: string;
}) {
  const laco = slug ? getLaco(slug) : undefined;

  if (!numero || !nome || !cidade || !laco) {
    return (
      <div>
        <h1 className="font-heading text-3xl">Não achei esse pedido</h1>
        <p className="mt-2 text-muted-foreground">
          Fecha um laço de novo, que aparece aqui.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-6" })}>
          Escolher outro
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <p className="text-sm text-muted-foreground">Pedido #{numero}</p>
      <h1 className="font-heading mt-2 text-4xl">Pedido fechado.</h1>
      <div className="mt-6 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
        <div className="relative aspect-[16/9]">
          <Image
            src={laco.foto}
            alt=""
            fill
            className="object-cover"
            sizes="512px"
          />
        </div>
        <div className="p-4">
          <p className="font-heading text-xl">{laco.nome}</p>
          <p className="text-sm text-muted-foreground">{laco.marca}</p>
          <p className="mt-2">{formatPreco(laco.precoCentavos)}</p>
        </div>
      </div>
      <p className="mt-4 text-muted-foreground">
        {nome}, {cidade}. Pedido de mentira — o laço não vai chegar no correio.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className={buttonVariants()}>
          Escolher outro
        </Link>
        <Link
          href={`/lacos/${laco.slug}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Ver o laço de novo
        </Link>
      </div>
    </div>
  );
}
