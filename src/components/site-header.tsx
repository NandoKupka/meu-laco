import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-[color-mix(in_oklch,var(--background),var(--card)_40%)]">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-lg tracking-tight">
          Meu Laço
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/lacos"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Já sei o laço
          </Link>
          <Link
            href="/escolher"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Me ajuda
          </Link>
        </nav>
      </div>
    </header>
  );
}
