import { BackToTop } from "@/components/BackToTop";

/** Футер із контактом. Бічні поля й ширина такі самі, як у hero. Ціль пункту меню «Contact». */
export function SiteFooter() {
  return (
    <footer id="contact" className="bg-canvas-dark pb-6 text-text-on-dark">
      {/* Плавна смуга з чотирьох кольорів проєктів: три градієнти поспіль. */}
      <div aria-hidden="true" className="flex h-1">
        <span className="flex-1 bg-linear-to-r from-project-miri to-project-rentflow" />
        <span className="flex-1 bg-linear-to-r from-project-rentflow to-project-studio" />
        <span className="flex-1 bg-linear-to-r from-project-studio to-project-sema" />
      </div>

      <div className="px-6 pt-12">
        <div className="mx-auto flex w-full max-w-page flex-col gap-10">
          {/* Адреси ще немає, тому це текст-заглушка, а не посилання. У ній 26 символів, як у майбутній адресі. */}
          <p className="text-email wrap-anywhere">
            [your.email@address.later]
          </p>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-dark pt-4">
            <p className="text-label uppercase text-text-muted-on-dark">
              Anastasiya M.
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
