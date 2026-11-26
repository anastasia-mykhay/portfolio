"use client";

import { useEffect, useRef, useState } from "react";

/** Скільки кільце тримається вгорі після кліку, мс. */
const CLICK_RUN_MS = 1600;

/** Кнопка «Back to top» у футері. Лише для темного фону canvas-dark. */
export function BackToTop() {
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleClick() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });

    setIsRunning(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsRunning(false), CLICK_RUN_MS);
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className="group flex cursor-pointer items-center gap-4 text-label uppercase text-text-muted-on-dark hover:text-text-on-dark focus-visible:text-text-on-dark focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-text-on-dark"
    >
      <span>Back to top</span>
      <span aria-hidden="true" className="relative flex flex-col gap-3 p-1">
        <span className="size-dot rounded-control bg-project-miri" />
        <span className="size-dot rounded-control bg-project-rentflow" />
        <span className="size-dot rounded-control bg-project-studio" />
        <span className="size-dot rounded-control bg-project-sema" />
        {/* Відступ колонки p-1 центрує кільце навколо першої крапки. */}
        <span
          className={`absolute top-0 left-0 size-ring rounded-control border border-text-on-dark transition-transform duration-700 ease-ring motion-reduce:transition-none ${
            isRunning
              ? "translate-y-0"
              : "translate-y-ring-travel group-hover:translate-y-0 group-focus-visible:translate-y-0"
          }`}
        />
      </span>
    </button>
  );
}
