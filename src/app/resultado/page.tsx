import Link from "next/link";
import type { Metadata } from "next";

import { LacoCard } from "@/components/laco-card";
import { buttonVariants } from "@/components/ui/button";
import { parseAnswers, recommend } from "@/lib/recommend";

export const metadata: Metadata = {
  title: "O teu laço",
};

export default async function ResultadoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const answers = parseAnswers(params);
  const rec = answers ? recommend(answers) : null;

  if (!answers || !rec) {
    return (
      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-16">
        <h1 className="font-heading text-3xl">Falta alguma resposta</h1>
        <p className="mt-2 text-muted-foreground">
          Volta e escolhe prova, giro e mão. Sem isso eu não indico.
        </p>
        <Link href="/escolher" className={buttonVariants({ className: "mt-6" })}>
          Me ajuda a escolher
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-muted-foreground">Indicação</p>
      <h1 className="font-heading text-4xl">O teu laço</h1>
      <div className="mt-8">
        <LacoCard laco={rec.principal} destaque frase={rec.frase} />
      </div>
      {rec.outros.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-heading text-2xl">Outros dois</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {rec.outros.map((laco, index) => (
              <LacoCard
                key={laco.slug}
                laco={laco}
                frase={
                  rec.referencia && laco.slug === rec.referencia.slug
                    ? "A referência que tu apontou."
                    : index === 0
                      ? "Outra que fecha com o que tu falou."
                      : undefined
                }
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
