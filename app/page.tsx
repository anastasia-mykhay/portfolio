import { Marker } from "@/components/Marker";
import { NavLink } from "@/components/NavLink";

export default function Home() {
  return (
    <main>
      {/* Перший екран. Бічні поля: 24 px, а вміст не ширший за max-w-page. */}
      <section className="flex min-h-svh flex-col bg-canvas-dark px-6 pt-8 pb-6 text-text-on-dark">
        <div className="mx-auto flex w-full max-w-page flex-1 flex-col">
          <header className="flex items-start justify-between gap-6">
            <p className="flex flex-col text-label uppercase">
              <span>Anastasiya</span>
              <span>M.</span>
            </p>
            <nav aria-label="Main" className="flex gap-8">
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>
          </header>

          {/* На вузьких екранах колонка, від lg сітка 12 колонок і 4 рядки. */}
          <div className="flex flex-1 flex-col justify-center py-8 lg:grid lg:grid-cols-12 lg:grid-rows-4 lg:gap-x-6">
            <h1 className="mb-6 w-max max-w-full text-display-xl lg:col-span-full lg:row-span-4 lg:row-start-1 lg:mb-0 lg:self-center lg:justify-self-start">
              <span className="block text-right">I design</span>{" "}
              <em className="block">AI-assisted</em>{" "}
              <span className="block">interfaces</span>
            </h1>

            <div className="relative mt-4 flex max-w-xs items-start gap-6 lg:col-span-2 lg:col-start-8 lg:row-start-4 lg:mt-0 lg:-translate-x-8 lg:-translate-y-16 lg:self-end">
              <span className="flex h-lh shrink-0 items-center text-body">
                <Marker variant="filled" className="text-project-miri" />
              </span>
              <p className="text-body">
                Turning AI features into screens built around the person using
                them.
              </p>
            </div>

            <div className="relative mt-4 flex max-w-xs items-start gap-6 lg:col-span-3 lg:col-start-10 lg:row-start-4 lg:mt-0 lg:self-end">
              <span className="flex h-lh shrink-0 items-center text-body">
                <Marker variant="hollow" />
              </span>
              <p className="text-body text-text-muted-on-dark">
                Four projects, each shown from the first question to the final
                screens, with the reasoning in between.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-line-dark pt-4">
            <span aria-hidden="true" className="flex gap-2">
              <Marker variant="filled" className="text-project-miri" />
              <Marker variant="filled" className="text-project-rentflow" />
              <Marker variant="filled" className="text-project-studio" />
              <Marker variant="filled" className="text-project-sema" />
            </span>
            <p className="text-label uppercase">
              UI/UX designer
              <br />
              Human–AI interaction
            </p>
          </div>
        </div>
      </section>

      {/* Цілі для якорів меню. Вміст секцій ще не перенесено. */}
      <section id="projects" />
      <section id="contact" />
    </main>
  );
}
