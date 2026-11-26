type PillProps = {
  /** Текст тегу. */
  children: string;
};

/** Плашка-тег на картці проєкту. Неінтерактивна. */
export function Pill({ children }: PillProps) {
  return (
    <span className="inline-block rounded-control bg-canvas-dark px-4 py-2 text-small text-text-on-dark">
      {children}
    </span>
  );
}
