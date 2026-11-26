type MarkerProps = {
  /** hollow: лише контур 1 px. filled: суцільна заливка без окремої рамки. */
  variant: "hollow" | "filled";
  /** Класи самої крапки. Потрібен, щоб дати їй колір, відмінний від кольору тексту батьківського елемента. */
  className?: string;
};

const variantClasses: Record<MarkerProps["variant"], string> = {
  hollow: "border",
  filled: "bg-current",
};

/** Кругла декоративна крапка-маркер перед текстом. Колір бере з тексту (currentColor). Неінтерактивна. */
export function Marker({ variant, className }: MarkerProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "inline-block size-dot shrink-0 rounded-control",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
