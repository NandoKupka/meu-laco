import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-4 py-16">
      <h1 className="font-heading text-3xl">Essa página não existe</h1>
      <p className="mt-2 text-muted-foreground">
        Volta pro começo e escolhe o laço de novo.
      </p>
      <Link href="/" className={buttonVariants({ className: "mt-6 w-fit" })}>
        Qual laço tu leva?
      </Link>
    </div>
  );
}
