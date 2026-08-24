import { cn } from "@/lib/utils";

type Option<T extends string> = {
  value: T;
  label: string;
  hint?: string;
};

export function ChoiceList<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value?: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left transition-colors",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-primary/40 hover:bg-accent",
            )}
          >
            <span className="block font-medium">{option.label}</span>
            {option.hint ? (
              <span
                className={cn(
                  "mt-0.5 block text-sm",
                  selected
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {option.hint}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
