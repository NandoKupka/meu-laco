import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  formatComprimento,
  formatPreco,
  GROSSURA_LABEL,
  MACIEZ_LABEL,
  PROVA_LABEL,
  type Laco,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Props = {
  laco: Laco;
  destaque?: boolean;
  frase?: string;
  className?: string;
};

export function LacoCard({ laco, destaque, frase, className }: Props) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10",
        destaque && "ring-2 ring-primary/35",
        className,
      )}
    >
      <Link href={`/lacos/${laco.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-muted">
          <Image
            src={laco.foto}
            alt={`${laco.nome}, laço da ${laco.marca}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3 p-4">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            {laco.marca} · {PROVA_LABEL[laco.prova]}
          </p>
          <h3 className="font-heading text-xl leading-tight">{laco.nome}</h3>
        </div>
        {frase ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{frase}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {MACIEZ_LABEL[laco.maciez]} · {GROSSURA_LABEL[laco.grossura]} ·{" "}
            {formatComprimento(laco.comprimentoM)}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <p className="font-medium">{formatPreco(laco.precoCentavos)}</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/lacos/${laco.slug}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Ver laço
            </Link>
            {destaque ? (
              <Link
                href={`/pedido/${laco.slug}`}
                className={buttonVariants({ size: "sm" })}
              >
                Levar este
              </Link>
            ) : (
              <Link
                href={`/lacos/${laco.slug}#parecidos`}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Quero um parecido
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
