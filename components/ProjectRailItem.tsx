import { Marker } from "./Marker";

type ProjectRailItemProps = {
  /** Номер проєкту. Показується щонайменше двома цифрами: 1 стає «01», 10 лишається «10». */
  number: number;
  /** Проєкт, колір якого отримує крапка поточного пункту й пункту під мишею. */
  project: "miri" | "rentflow" | "studio" | "sema";
  /** Чи цей пункт поточний. Визначає той, хто складає рейку. */
  isCurrent: boolean;
  /** Доступна назва кнопки, наприклад «Go to project 01, Miri». Має містити видимий номер. */
  label: string;
  /** Що зробити після кліку. Сам пункт нічого не прокручує. */
  onClick: () => void;
};

/* Назви класів написані повністю, щоб Tailwind їх побачив. */
const dotClasses: Record<
  ProjectRailItemProps["project"],
  { idle: string; current: string }
> = {
  miri: {
    idle: "text-line group-hover:text-project-miri",
    current: "text-project-miri",
  },
  rentflow: {
    idle: "text-line group-hover:text-project-rentflow",
    current: "text-project-rentflow",
  },
  studio: {
    idle: "text-line group-hover:text-project-studio",
    current: "text-project-studio",
  },
  sema: {
    idle: "text-line group-hover:text-project-sema",
    current: "text-project-sema",
  },
};

/** Один пункт рейки проєктів: кнопка з крапкою й номером. Для світлого фону canvas. */
export function ProjectRailItem({
  number,
  project,
  isCurrent,
  label,
  onClick,
}: ProjectRailItemProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={isCurrent ? "true" : undefined}
      onClick={onClick}
      className={[
        "group flex h-12 cursor-pointer items-center gap-3 pl-1 text-label uppercase",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text",
        isCurrent ? "text-text" : "text-text-muted hover:text-text",
      ].join(" ")}
    >
      <Marker
        variant="filled"
        className={[
          "transition-colors duration-400 motion-reduce:transition-none",
          dotClasses[project][isCurrent ? "current" : "idle"],
        ].join(" ")}
      />
      <span>{String(number).padStart(2, "0")}</span>
    </button>
  );
}
