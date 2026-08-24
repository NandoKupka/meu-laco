"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { LacoCard } from "@/components/laco-card";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { buscaLacos } from "@/lib/catalog";

export function Catalogo() {
  const [q, setQ] = useState("");
  const lista = useMemo(() => buscaLacos(q), [q]);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="font-heading text-3xl sm:text-4xl">Já sei o laço</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Busca pelo nome, marca ou prova. Se não achar, eu te indico por giro.
      </p>
      <div className="mt-6 max-w-md">
        <Input
          value={q}
          onChange={(event) => setQ(event.currentTarget.value)}
          placeholder="Serra 57, pé, Giro…"
          aria-label="Buscar laço"
          className="h-11"
        />
      </div>

      {lista.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-6">
          <p className="font-medium">Não tem esse nome aqui.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Quer olhar por prova e giro?
          </p>
          <Link
            href="/escolher"
            className={buttonVariants({ className: "mt-4" })}
          >
            Me ajuda a escolher
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((laco) => (
            <LacoCard key={laco.slug} laco={laco} />
          ))}
        </div>
      )}
    </div>
  );
}
