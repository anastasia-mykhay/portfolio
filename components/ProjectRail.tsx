"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { ProjectRailItem } from "./ProjectRailItem";

export type ProjectRailEntry = {
  number: number;
  project: ComponentProps<typeof ProjectRailItem>["project"];
  /** Доступна назва кнопки. Має містити видимий номер. */
  label: string;
  /** id елемента на сторінці, за яким стежить рейка й до якого прокручує клік. */
  targetId: string;
};

type ProjectRailProps = {
  /** У тому порядку, в якому елементи йдуть на сторінці. */
  items: ProjectRailEntry[];
  /** Лише для розташування на сторінці. */
  className?: string;
};

/** Рейка проєктів: пункти й одне рухоме кільце навколо крапки поточного. Для світлого фону canvas. */
export function ProjectRail({ items, className }: ProjectRailProps) {
  /* isShown окремо від id, щоб кільце згасало там, де стоїть. */
  const [current, setCurrent] = useState({ id: "", isShown: false });

  const foundIndex = items.findIndex((item) => item.targetId === current.id);
  const currentIndex = current.isShown ? foundIndex : -1;
  const ringIndex = Math.max(foundIndex, 0);

  /* Рядок, а не масив: новий масив з тими самими id не перезапускає спостерігач. */
  const idsKey = JSON.stringify(items.map((item) => item.targetId));

  useEffect(() => {
    const ids: string[] = JSON.parse(idsKey);
    const inView = new Set<Element>();
    /* Елементи, яких на сторінці немає, пропускаємо. */
    const targets = ids.flatMap((id) => document.getElementById(id) ?? []);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target);
          else inView.delete(entry.target);
        }
        const first = targets.find((target) => inView.has(target));
        setCurrent((previous) =>
          first
            ? { id: first.id, isShown: true }
            : { ...previous, isShown: false },
        );
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [idsKey]);

  function goTo(targetId: string) {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.getElementById(targetId)?.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "start",
    });
  }

  return (
    <nav
      aria-label="Projects"
      className={[
        "max-lg:border-b max-lg:border-line max-lg:bg-canvas",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Ряд із прокруткою обрізає все за своїми межами. Поле p-1 лишає місце контуру фокуса. */}
      <div className="-mx-1 overflow-x-auto p-1 lg:m-0 lg:overflow-visible lg:p-0">
        <div className="relative flex w-max lg:w-auto lg:flex-col">
          {/*
            Основа кільця. Зсув задано у відсотках від її розміру. До lg вона має
            нульову висоту, тому рухається лише вбік. Від lg має нульову ширину,
            тому рухається лише вниз.
          */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 h-0 w-16 transition-transform duration-500 ease-ring motion-reduce:transition-none lg:h-12 lg:w-0"
            style={{ translate: `${ringIndex * 100}% ${ringIndex * 100}%` }}
          >
            {/* h-12, як у пункту: так кільце стає по центру крапки. */}
            <span className="flex h-12 items-center">
              <span
                className={[
                  "size-ring shrink-0 rounded-control border border-text transition-opacity duration-300 motion-reduce:transition-none",
                  currentIndex === -1 ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
            </span>
          </span>

          {items.map((item, index) => (
            <div
              key={item.targetId}
              className="flex w-16 shrink-0 flex-col lg:w-auto"
            >
              <ProjectRailItem
                number={item.number}
                project={item.project}
                label={item.label}
                isCurrent={index === currentIndex}
                onClick={() => goTo(item.targetId)}
              />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
