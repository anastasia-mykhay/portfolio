import Image, { type StaticImageData } from "next/image";
import { Pill } from "@/components/Pill";
import { ProjectRail, type ProjectRailEntry } from "@/components/ProjectRail";
import { RoleItem } from "@/components/RoleItem";
import miriHome from "@/assets/miri-home.png";
import rentflowDashboard from "@/assets/rentflow-dashboard.png";
import semaHomepage from "@/assets/sema-homepage.png";

type Project = {
  /** Ключ проєкту: колір крапки в рейці та id картки. */
  key: ProjectRailEntry["project"];
  name: string;
  subtitle: string;
  meta: string;
  question: string;
  decision: string;
  tags: string[];
  /** Повний клас заливки, щоб Tailwind його побачив. */
  fill: string;
  /** Без screenshot картка показує заглушку. */
  screenshot?: { src: StaticImageData; alt: string };
};

/* Порядок фіксований. Тексти карток такі самі, як у макеті. */
const projects: Project[] = [
  {
    key: "miri",
    name: "Miri",
    subtitle: "AI concierge",
    meta: "Mobile app · Concept · 2026",
    question:
      "How should the concierge get to know a guest who doesn’t want to be asked questions?",
    decision:
      "Preferences come from behavior, not questionnaires. It offers one suggestion at a time and declining works as a refinement.",
    tags: ["Human–AI interaction", "Korean service culture", "Design system"],
    fill: "bg-project-miri",
    screenshot: {
      src: miriHome,
      alt: "Miri home screen with a proposed corner table",
    },
  },
  {
    key: "rentflow",
    name: "RentFlow",
    subtitle: "Property management platform",
    meta: "Web app · Concept · 2026",
    question:
      "How should AI speak to an owner, a tenant and a manager about the same property?",
    decision:
      "Each role gets its own dashboard, where AI suggests next to the numbers and the person decides.",
    tags: ["Human–AI interaction", "Information architecture"],
    fill: "bg-project-rentflow",
    screenshot: {
      src: rentflowDashboard,
      alt: "RentFlow owner dashboard with an AI insight about pending payments",
    },
  },
  {
    key: "studio",
    name: "Studio",
    subtitle: "AI concept boards",
    meta: "Web app · In progress · 2026",
    question:
      "How can a designer use AI to assemble a concept board and still feel that every choice is theirs?",
    decision:
      "The AI only searches and combines real catalog items. The designer swaps any piece, the budget rebalances, and the client approves.",
    tags: ["Human–AI interaction", "Design tools", "Real product data"],
    fill: "bg-project-studio",
  },
  {
    key: "sema",
    name: "SeMA",
    subtitle: "Museum website redesign",
    meta: "Web redesign · Concept · 2026",
    question:
      "What happens when the findings of a UX audit are applied to an existing museum website?",
    decision:
      "The audit set the direction. The redesign followed it through the navigation, the exhibitions and the collection page.",
    tags: ["UX audit", "Navigation redesign", "Visual hierarchy"],
    fill: "bg-project-sema",
    screenshot: { src: semaHomepage, alt: "Redesigned SeMA museum homepage" },
  },
];

/* Номер і id рахуємо тут, щоб у рейки й карток вони завжди збігалися. */
const entries = projects.map((project, index) => ({
  ...project,
  number: `0${index + 1}`,
  targetId: `project-${project.key}`,
}));

const railItems: ProjectRailEntry[] = entries.map((entry, index) => ({
  number: index + 1,
  project: entry.key,
  label: `Go to project ${entry.number}, ${entry.name}`,
  targetId: entry.targetId,
}));

/** Блок Projects головної сторінки. Бічні поля й ширина такі самі, як у hero. */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="px-6 py-section"
    >
      <div className="mx-auto flex w-full max-w-page flex-col gap-8">
        <div className="border-b border-line pb-6">
          <h2 id="projects-title" className="text-display-l">
            Projects
          </h2>
        </div>

        {/* Обгортка обмежує sticky: рейка не виходить за блок із картками. */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          {/* До lg ряд на всю ширину екрана (поля повертає px-6), від lg стовпчик ліворуч. */}
          <ProjectRail
            items={railItems}
            className="sticky top-0 z-10 max-lg:-mx-6 max-lg:px-6 lg:top-6 lg:w-rail lg:shrink-0 lg:self-start"
          />
          {/* Від lg усі картки заввишки як найвища: auto-rows-fr робить ряди рівними. */}
          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:grid lg:auto-rows-fr">
            {entries.map((project, index) => (
              /* До lg одна колонка: текстова обгортка зникає (contents), і плашки стають після скріншота. */
              <article
                key={project.targetId}
                id={project.targetId}
                className={`flex scroll-mt-16 flex-col gap-8 rounded-card p-6 text-text lg:grid lg:scroll-mt-6 lg:grid-cols-2 lg:p-10 ${project.fill}`}
              >
                <div className="contents lg:flex lg:flex-col lg:justify-between lg:gap-8">
                  <p className="text-label uppercase">
                    {`${project.number} · ${project.meta}`}
                  </p>
                  <h3 className="text-display-m">
                    {project.name}
                    {/* На 1024–1279 px колонка найвужча, тому відступ 32 px, інакше довгий підзаголовок переноситься. */}
                    <span className="mt-3 ml-12 block text-display-s lg:ml-8 xl:ml-12">
                      {project.subtitle}
                    </span>
                  </h3>
                  {/* lg:mt-8 разом із gap-8 колонки дає 64 px після підзаголовка. */}
                  <div className="flex flex-col gap-3 border-t border-text/35 pt-4 lg:mt-8">
                    <RoleItem
                      marker="hollow"
                      title="Question"
                      text={project.question}
                    />
                    <RoleItem
                      marker="filled"
                      title="Decision"
                      text={project.decision}
                    />
                  </div>
                  <ul className="flex flex-wrap gap-2 max-lg:order-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Pill>{tag}</Pill>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* На компʼютері сторона скріншота чергується. */}
                <div
                  className={`flex items-center justify-center max-lg:order-1 ${
                    index % 2 ? "lg:order-first" : ""
                  }`}
                >
                  {project.screenshot ? (
                    /* Не більше за власний розмір файлу: тому телефон вузький, а дашборд широкий. */
                    <Image
                      src={project.screenshot.src}
                      alt={project.screenshot.alt}
                      unoptimized
                      className="h-auto max-w-full rounded-image shadow-screen"
                    />
                  ) : (
                    <p className="w-full rounded-image border border-dashed border-text/35 px-4 py-16 text-center text-small">
                      Screens in progress
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
