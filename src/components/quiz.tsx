"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ChoiceList } from "@/components/choice-list";
import { buttonVariants } from "@/components/ui/button";
import { LACOS } from "@/lib/catalog";
import type { MaoPref, GiroPeao } from "@/lib/recommend";
import type { Prova } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Draft = {
  prova?: Prova;
  giro?: GiroPeao;
  mao?: MaoPref;
  referencia?: string | null;
};

export function Quiz() {
  const router = useRouter();
  const [passo, setPasso] = useState(0);
  const [draft, setDraft] = useState<Draft>({});

  const podeSeguir = useMemo(() => {
    if (passo === 0) return Boolean(draft.prova);
    if (passo === 1) return Boolean(draft.giro);
    if (passo === 2) return Boolean(draft.mao);
    return true;
  }, [draft, passo]);

  function fechar(referencia?: string | null) {
    const params = new URLSearchParams({
      prova: draft.prova!,
      giro: draft.giro!,
      mao: draft.mao!,
    });
    if (referencia) params.set("ref", referencia);
    router.push(`/resultado?${params.toString()}`);
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <p className="mb-6 text-sm text-muted-foreground" aria-label="Passo do questionário">
        {[0, 1, 2, 3].map((n) => (
          <span key={n}>
            <span className={cn(n === passo ? "text-foreground" : "text-muted-foreground/70")}>
              {n + 1}
            </span>
            {n < 3 ? " · " : ""}
          </span>
        ))}
      </p>

      {passo === 0 ? (
        <>
          <h1 className="font-heading text-3xl">Qual a prova?</h1>
          <p className="mt-2 mb-6 text-muted-foreground">
            Isso já trava o comprimento do laço.
          </p>
          <ChoiceList
            name="prova"
            value={draft.prova}
            onChange={(prova) => setDraft((d) => ({ ...d, prova }))}
            options={[
              { value: "cabeca", label: "Cabeça" },
              { value: "pe", label: "Pé" },
              { value: "individual", label: "Individual" },
            ]}
          />
        </>
      ) : null}

      {passo === 1 ? (
        <>
          <h1 className="font-heading text-3xl">Como é o teu giro?</h1>
          <p className="mt-2 mb-6 text-muted-foreground">
            Do peão, não da corda. Giro rápido pede laço mais firme.
          </p>
          <ChoiceList
            name="giro"
            value={draft.giro}
            onChange={(giro) => setDraft((d) => ({ ...d, giro }))}
            options={[
              {
                value: "parado",
                label: "Mais parado",
                hint: "Giro mais largo, armada quieta.",
              },
              { value: "meio", label: "No meio" },
              {
                value: "rapido",
                label: "Giro rápido",
                hint: "A corda precisa ser mais firme pra armada não fechar.",
              },
            ]}
          />
        </>
      ) : null}

      {passo === 2 ? (
        <>
          <h1 className="font-heading text-3xl">Na mão, tu quer como?</h1>
          <p className="mt-2 mb-6 text-muted-foreground">
            Fina e leve, no meio, ou mais grossa, com corpo.
          </p>
          <ChoiceList
            name="mao"
            value={draft.mao}
            onChange={(mao) => setDraft((d) => ({ ...d, mao }))}
            options={[
              { value: "leve", label: "Mais fina e leve" },
              { value: "meio", label: "No meio" },
              { value: "corpo", label: "Mais grossa, com corpo" },
            ]}
          />
        </>
      ) : null}

      {passo === 3 ? (
        <>
          <h1 className="font-heading text-3xl">Tem um laço de referência?</h1>
          <p className="mt-2 mb-6 text-muted-foreground">
            Se quiser, eu puxo pro lado de um que tu já conhece. Se não, pula.
          </p>
          <div className="grid gap-2">
            {LACOS.map((laco) => {
              const selected = draft.referencia === laco.slug;
              return (
                <button
                  key={laco.slug}
                  type="button"
                  onClick={() =>
                    setDraft((d) => ({
                      ...d,
                      referencia: d.referencia === laco.slug ? null : laco.slug,
                    }))
                  }
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <span className="block font-medium">{laco.nome}</span>
                  <span
                    className={cn(
                      "text-sm",
                      selected
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {laco.marca}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {passo > 0 ? (
          <button
            type="button"
            className={buttonVariants({ variant: "ghost" })}
            onClick={() => setPasso((p) => p - 1)}
          >
            Voltar
          </button>
        ) : (
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Voltar
          </Link>
        )}
        {passo < 3 ? (
          <button
            type="button"
            disabled={!podeSeguir}
            className={buttonVariants()}
            onClick={() => setPasso((p) => p + 1)}
          >
            Continuar
          </button>
        ) : (
          <>
            <button
              type="button"
              className={buttonVariants({ variant: "outline" })}
              onClick={() => fechar(null)}
            >
              Pular
            </button>
            <button
              type="button"
              className={buttonVariants()}
              onClick={() => fechar(draft.referencia ?? null)}
            >
              Ver o laço
            </button>
          </>
        )}
      </div>
    </div>
  );
}
