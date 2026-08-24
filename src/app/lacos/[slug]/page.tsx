import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LacoCard } from "@/components/laco-card";
import { buttonVariants } from "@/components/ui/button";
import {
  formatComprimento,
  formatPreco,
  GIRO_FICHA_LABEL,
  GROSSURA_LABEL,
  LACOS,
  MACIEZ_LABEL,
  PROVA_LABEL,
  getLaco,
  parecidos,
} from "@/lib/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LACOS.map((laco) => ({ slug: laco.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const laco = getLaco(slug);
  if (!laco) return { title: "Laço" };
  return { title: laco.nome };
}

export default async function LacoPage({ params }: Props) {
  const { slug } = await params;
  const laco = getLaco(slug);
  if (!laco) notFound();

  const outros = parecidos(laco, 2);

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/lacos"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Todos os laços
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
          <Image
            src={laco.foto}
            alt={`${laco.nome}, laço da ${laco.marca}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            {laco.marca}
          </p>
          <h1 className="font-heading mt-1 text-4xl">{laco.nome}</h1>
          <p className="mt-3 text-2xl font-medium">
            {formatPreco(laco.precoCentavos)}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <Spec label="Prova" value={PROVA_LABEL[laco.prova]} />
            <Spec
              label="Giro"
              value={
                laco.notaGiro
                  ? `${GIRO_FICHA_LABEL[laco.giro]} — ${laco.notaGiro}`
                  : GIRO_FICHA_LABEL[laco.giro]
              }
            />
            <Spec label="Maciez" value={MACIEZ_LABEL[laco.maciez]} />
            <Spec
              label="Comprimento"
              value={formatComprimento(laco.comprimentoM)}
            />
            <Spec label="Grossura" value={GROSSURA_LABEL[laco.grossura]} />
            <Spec label="Tentos" value="4 tentos" />
            <Spec label="Material" value="Sintética" />
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/pedido/${laco.slug}`}
              className={buttonVariants({ className: "h-11 px-5" })}
            >
              Levar este
            </Link>
            <Link
              href="/escolher"
              className={buttonVariants({
                variant: "outline",
                className: "h-11 px-5",
              })}
            >
              Me ajuda a escolher
            </Link>
          </div>
        </div>
      </div>

      <section id="parecidos" className="mt-14 scroll-mt-8">
        <h2 className="font-heading text-2xl">Parecido com</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Mesma prova, maciez perto.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {outros.map((outro) => (
            <LacoCard key={outro.slug} laco={outro} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
