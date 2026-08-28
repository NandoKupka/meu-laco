import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PedidoForm } from "@/components/pedido-form";
import { LACOS, PROVA_LABEL, getLaco } from "@/lib/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LACOS.map((laco) => ({ slug: laco.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const laco = getLaco(slug);
  return { title: laco ? `Levar ${laco.nome}` : "Pedido" };
}

export default async function PedidoPage({ params }: Props) {
  const { slug } = await params;
  const laco = getLaco(slug);
  if (!laco) notFound();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-heading text-4xl">Levar este</h1>
      <p className="mt-2 text-muted-foreground">
        Um laço por vez. Nome, cidade, e pronto.
      </p>
      <div className="mt-8 flex gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={laco.foto}
            alt=""
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
        <div>
          <p className="font-heading text-xl">{laco.nome}</p>
          <p className="text-sm text-muted-foreground">
            {laco.marca} · {PROVA_LABEL[laco.prova]}
          </p>
        </div>
      </div>
      <PedidoForm laco={laco} />
    </div>
  );
}
