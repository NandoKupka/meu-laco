import {
  LACOS,
  MACIEZ_LABEL,
  MACIEZ_ORDEM,
  PROVA_LABEL,
  getLaco,
  type Grossura,
  type Laco,
  type Maciez,
  type Prova,
} from "./catalog";

export type GiroPeao = "parado" | "meio" | "rapido";
export type MaoPref = "leve" | "meio" | "corpo";

export type Answers = {
  prova: Prova;
  giro: GiroPeao;
  mao: MaoPref;
  referencia?: string | null;
};

export type Recommendation = {
  principal: Laco;
  outros: Laco[];
  frase: string;
  referencia?: Laco;
};

function maciezAlvo(prova: Prova, giro: GiroPeao): Maciez[] {
  if (prova === "cabeca") {
    if (giro === "parado") {
      return ["extra-macia", "macia", "macia-media", "media", "firme"];
    }
    if (giro === "meio") {
      return ["macia", "extra-macia", "macia-media", "media", "firme"];
    }
    return ["macia-media", "macia", "media", "extra-macia", "firme"];
  }

  if (prova === "pe") {
    if (giro === "parado") {
      return ["macia-media", "macia", "media", "firme", "extra-macia"];
    }
    if (giro === "meio") {
      return ["media", "macia-media", "firme", "macia", "extra-macia"];
    }
    return ["firme", "media", "macia-media", "macia", "extra-macia"];
  }

  if (giro === "parado") {
    return ["macia", "extra-macia", "macia-media", "media", "firme"];
  }
  if (giro === "meio") {
    return ["macia", "macia-media", "extra-macia", "media", "firme"];
  }
  return ["macia-media", "macia", "media", "firme", "extra-macia"];
}

function grossuraAlvo(mao: MaoPref): Grossura[] {
  if (mao === "leve") return ["fina", "meio", "corpo"];
  if (mao === "meio") return ["meio", "fina", "corpo"];
  return ["corpo", "meio", "fina"];
}

function pontua(laco: Laco, answers: Answers) {
  if (laco.prova !== answers.prova) return -1000;
  const maciez = maciezAlvo(answers.prova, answers.giro).indexOf(laco.maciez);
  const grossura = grossuraAlvo(answers.mao).indexOf(laco.grossura);
  return 200 - maciez * 12 - grossura * 5;
}

function comparaMaciez(a: Laco, b: Laco) {
  const ia = MACIEZ_ORDEM.indexOf(a.maciez);
  const ib = MACIEZ_ORDEM.indexOf(b.maciez);
  if (ia > ib) return "um pouco mais firme";
  if (ia < ib) return "um pouco mais macia";
  return "no mesmo corpo";
}

function fraseGiro(giro: GiroPeao) {
  if (giro === "rapido") return "giro rápido";
  if (giro === "parado") return "giro mais parado";
  return "giro no meio";
}

function frasePrincipal(laco: Laco, answers: Answers) {
  const prova = PROVA_LABEL[laco.prova];
  const giro = fraseGiro(answers.giro);
  const maciez = MACIEZ_LABEL[laco.maciez].toLocaleLowerCase("pt-BR");

  if (answers.giro === "rapido") {
    return `${prova}, ${giro}, ${maciez} pra armada não fechar cedo.`;
  }
  if (answers.giro === "parado") {
    return `${prova}, ${giro}, ${maciez} pra sentir a ponta.`;
  }
  return `${prova}, ${giro}, ${maciez} o bastante pra armada não fechar cedo.`;
}

export function recommend(answers: Answers): Recommendation | null {
  const ranque = LACOS.map((laco) => ({
    laco,
    pontos: pontua(laco, answers),
  }))
    .filter((item) => item.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .map((item) => item.laco);

  if (ranque.length === 0) return null;

  const referencia = answers.referencia ? getLaco(answers.referencia) : undefined;
  const principal = ranque[0];

  if (referencia && referencia.slug !== principal.slug) {
    const resto = ranque.filter((laco) => laco.slug !== referencia.slug);
    const outros = [
      referencia,
      ...resto.filter((laco) => laco.slug !== principal.slug),
    ].slice(0, 2);

    return {
      principal,
      outros,
      referencia,
      frase: `No estilo da ${referencia.nome}, ${comparaMaciez(principal, referencia)}, porque teu giro é ${fraseGiro(answers.giro).replace("giro ", "")}.`,
    };
  }

  return {
    principal,
    outros: ranque.slice(1, 3),
    referencia: referencia?.slug === principal.slug ? referencia : undefined,
    frase: frasePrincipal(principal, answers),
  };
}

export function parseAnswers(
  params: Record<string, string | string[] | undefined>,
): Answers | null {
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const prova = get("prova");
  const giro = get("giro");
  const mao = get("mao");
  const referencia = get("ref") || null;

  if (
    (prova === "cabeca" || prova === "pe" || prova === "individual") &&
    (giro === "parado" || giro === "meio" || giro === "rapido") &&
    (mao === "leve" || mao === "meio" || mao === "corpo")
  ) {
    return { prova, giro, mao, referencia };
  }

  return null;
}
