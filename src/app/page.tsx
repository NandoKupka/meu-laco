import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BASE_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="relative flex flex-1 flex-col">
      <div className="relative min-h-[calc(100dvh-8.5rem)] overflow-hidden">
        <Image
          src={`${BASE_PATH}/arena-hero.png`}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.04_50)] via-[oklch(0.22_0.04_50/0.55)] to-[oklch(0.22_0.04_50/0.25)]" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8.5rem)] w-full max-w-5xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm tracking-[0.2em] text-primary-foreground/70 uppercase">
            Meu Laço
          </p>
          <h1 className="font-heading mt-3 max-w-xl text-4xl text-primary-foreground sm:text-6xl">
            Qual laço tu leva?
          </h1>
          <p className="mt-4 max-w-md text-base text-primary-foreground/80 sm:text-lg">
            Cabeça, pé ou individual. Tu escolhe o nome ou eu te indico.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/lacos"
              className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base")}
            >
              Já sei o laço
            </Link>
            <Link
              href="/escolher"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 border-primary-foreground/30 bg-primary-foreground/10 px-6 text-base text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground",
              )}
            >
              Me ajuda a escolher
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
