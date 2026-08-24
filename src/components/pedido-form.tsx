"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPreco, type Laco } from "@/lib/catalog";

export function PedidoForm({ laco }: { laco: Laco }) {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function fechar(event: React.FormEvent) {
    event.preventDefault();
    if (!nome.trim()) {
      setErro("Falta o nome.");
      return;
    }
    if (!cidade.trim()) {
      setErro("Falta a cidade.");
      return;
    }
    const numero = String(1000 + Math.floor(Math.random() * 900));
    const params = new URLSearchParams({
      numero,
      slug: laco.slug,
      nome: nome.trim(),
      cidade: cidade.trim(),
    });
    router.push(`/pedido/ok?${params.toString()}`);
  }

  return (
    <form onSubmit={fechar} className="mt-8 max-w-md space-y-5">
      <p className="text-lg font-medium">{formatPreco(laco.precoCentavos)}</p>
      <div className="space-y-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          className="h-11"
          value={nome}
          onChange={(event) => {
            setNome(event.currentTarget.value);
            setErro(null);
          }}
          autoComplete="name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cidade">Cidade</Label>
        <Input
          id="cidade"
          className="h-11"
          value={cidade}
          onChange={(event) => {
            setCidade(event.currentTarget.value);
            setErro(null);
          }}
          autoComplete="address-level2"
        />
      </div>
      {erro ? <p className="text-sm text-destructive">{erro}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className={buttonVariants({ className: "h-11 px-5" })}>
          Fechar pedido
        </button>
        <Link
          href={`/lacos/${laco.slug}`}
          className={buttonVariants({ variant: "ghost", className: "h-11" })}
        >
          Voltar
        </Link>
      </div>
    </form>
  );
}
