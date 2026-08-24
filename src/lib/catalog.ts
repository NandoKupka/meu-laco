export type Prova = "cabeca" | "pe" | "individual";
export type Maciez =
  | "extra-macia"
  | "macia"
  | "macia-media"
  | "media"
  | "firme";
export type GiroFicha = "ligeiro" | "meio" | "parado";
export type Grossura = "fina" | "meio" | "corpo";
export type Marca = "Serra Brava" | "Pampa Line" | "Giro Forte";

export type Laco = {
  slug: string;
  nome: string;
  marca: Marca;
  prova: Prova;
  maciez: Maciez;
  giro: GiroFicha;
  grossura: Grossura;
  comprimentoM: number;
  precoCentavos: number;
  foto: string;
  notaGiro?: string;
};

export const MARCA_FOTO: Record<Marca, string> = {
  "Serra Brava": "/lacos/serra-brava.png",
  "Pampa Line": "/lacos/pampa-line.png",
  "Giro Forte": "/lacos/giro-forte.png",
};

export const LACOS: Laco[] = [
  {
    slug: "serra-55",
    nome: "Serra 55",
    marca: "Serra Brava",
    prova: "cabeca",
    maciez: "extra-macia",
    giro: "ligeiro",
    grossura: "fina",
    comprimentoM: 9.5,
    precoCentavos: 28900,
    foto: MARCA_FOTO["Serra Brava"],
  },
  {
    slug: "serra-57",
    nome: "Serra 57",
    marca: "Serra Brava",
    prova: "cabeca",
    maciez: "macia",
    giro: "meio",
    grossura: "meio",
    comprimentoM: 9.5,
    precoCentavos: 32900,
    foto: MARCA_FOTO["Serra Brava"],
  },
  {
    slug: "serra-60",
    nome: "Serra 60",
    marca: "Serra Brava",
    prova: "pe",
    maciez: "firme",
    giro: "parado",
    grossura: "corpo",
    comprimentoM: 10.6,
    precoCentavos: 36900,
    foto: MARCA_FOTO["Serra Brava"],
  },
  {
    slug: "pampa-cabeca",
    nome: "Pampa Cabeça",
    marca: "Pampa Line",
    prova: "cabeca",
    maciez: "macia",
    giro: "ligeiro",
    grossura: "fina",
    comprimentoM: 9.5,
    precoCentavos: 28900,
    foto: MARCA_FOTO["Pampa Line"],
  },
  {
    slug: "pampa-pe",
    nome: "Pampa Pé",
    marca: "Pampa Line",
    prova: "pe",
    maciez: "macia-media",
    giro: "meio",
    grossura: "meio",
    comprimentoM: 10.6,
    precoCentavos: 32900,
    foto: MARCA_FOTO["Pampa Line"],
  },
  {
    slug: "pampa-solo",
    nome: "Pampa Solo",
    marca: "Pampa Line",
    prova: "individual",
    maciez: "macia",
    giro: "meio",
    grossura: "corpo",
    comprimentoM: 8.5,
    precoCentavos: 28900,
    foto: MARCA_FOTO["Pampa Line"],
  },
  {
    slug: "giro-52",
    nome: "Giro 52",
    marca: "Giro Forte",
    prova: "cabeca",
    maciez: "macia-media",
    giro: "ligeiro",
    grossura: "fina",
    comprimentoM: 9.5,
    precoCentavos: 32900,
    foto: MARCA_FOTO["Giro Forte"],
    notaGiro:
      "Ponta ligeira, mas macia-média — a de cabeceiro de giro rápido.",
  },
  {
    slug: "giro-57",
    nome: "Giro 57",
    marca: "Giro Forte",
    prova: "cabeca",
    maciez: "macia",
    giro: "meio",
    grossura: "meio",
    comprimentoM: 9.5,
    precoCentavos: 32900,
    foto: MARCA_FOTO["Giro Forte"],
  },
  {
    slug: "giro-61",
    nome: "Giro 61",
    marca: "Giro Forte",
    prova: "pe",
    maciez: "firme",
    giro: "parado",
    grossura: "corpo",
    comprimentoM: 10.6,
    precoCentavos: 36900,
    foto: MARCA_FOTO["Giro Forte"],
  },
  {
    slug: "giro-treino",
    nome: "Giro Treino",
    marca: "Giro Forte",
    prova: "individual",
    maciez: "macia",
    giro: "meio",
    grossura: "corpo",
    comprimentoM: 8.5,
    precoCentavos: 24900,
    foto: MARCA_FOTO["Giro Forte"],
  },
];

export const PROVA_LABEL: Record<Prova, string> = {
  cabeca: "Cabeça",
  pe: "Pé",
  individual: "Individual",
};

export const MACIEZ_LABEL: Record<Maciez, string> = {
  "extra-macia": "Extra macia",
  macia: "Macia",
  "macia-media": "Macia-média",
  media: "Média",
  firme: "Firme",
};

export const GIRO_FICHA_LABEL: Record<GiroFicha, string> = {
  ligeiro: "Ligeiro",
  meio: "Meio",
  parado: "Parado",
};

export const GROSSURA_LABEL: Record<Grossura, string> = {
  fina: "Fina",
  meio: "No meio",
  corpo: "Com corpo",
};

export const MACIEZ_ORDEM: Maciez[] = [
  "extra-macia",
  "macia",
  "macia-media",
  "media",
  "firme",
];

export const GROSSURA_ORDEM: Grossura[] = ["fina", "meio", "corpo"];

export function getLaco(slug: string) {
  return LACOS.find((laco) => laco.slug === slug);
}

export function formatPreco(centavos: number) {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatComprimento(metros: number) {
  return `${metros.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} m`;
}

export function buscaLacos(query: string) {
  const q = query.trim().toLocaleLowerCase("pt-BR");
  if (!q) return LACOS;
  return LACOS.filter((laco) => {
    const hay = [
      laco.nome,
      laco.marca,
      PROVA_LABEL[laco.prova],
      MACIEZ_LABEL[laco.maciez],
      GIRO_FICHA_LABEL[laco.giro],
      GROSSURA_LABEL[laco.grossura],
    ]
      .join(" ")
      .toLocaleLowerCase("pt-BR");
    return hay.includes(q);
  });
}

export function parecidos(laco: Laco, limite = 2) {
  return LACOS.filter((outro) => outro.slug !== laco.slug)
    .map((outro) => {
      const mesmaProva = outro.prova === laco.prova ? 0 : 8;
      const maciez =
        Math.abs(
          MACIEZ_ORDEM.indexOf(outro.maciez) - MACIEZ_ORDEM.indexOf(laco.maciez),
        ) * 2;
      const grossura = Math.abs(
        GROSSURA_ORDEM.indexOf(outro.grossura) -
          GROSSURA_ORDEM.indexOf(laco.grossura),
      );
      const marca = outro.marca === laco.marca ? 0 : 1;
      return { outro, dist: mesmaProva + maciez + grossura + marca };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limite)
    .map((item) => item.outro);
}
