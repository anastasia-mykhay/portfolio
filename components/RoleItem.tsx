import { Marker } from "./Marker";

type RoleItemProps = {
  /** Назва пункту. Великі літери додає компонент. */
  title: string;
  /** Текст під назвою. */
  text: string;
  /** Вигляд крапки: hollow (контур) або filled (заливка). */
  marker: "hollow" | "filled";
};

/** Пункт картки проєкту: крапка-маркер, назва і текст під нею. Неінтерактивний. */
export function RoleItem({ title, text, marker }: RoleItemProps) {
  return (
    <div className="flex items-start gap-4 text-text">
      {/* Висота обгортки дорівнює одному рядку назви (h-lh), тому крапка стоїть по його центру. */}
      <span className="flex h-lh shrink-0 items-center text-label-strong">
        <Marker variant={marker} />
      </span>
      <div className="min-w-0">
        <p className="text-label-strong uppercase">{title}</p>
        <p className="text-body">{text}</p>
      </div>
    </div>
  );
}
