import {
  Controls,
  Description,
  Primary,
  Title,
  Unstyled,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectRail, type ProjectRailEntry } from "./ProjectRail";

const description = `
Рейка проєктів. Це пункти \`ProjectRailItem\` і одне кільце навколо крапки поточного пункту. Лежить на світлому фоні \`canvas\`.

### Параметри

| Проп | Тип | За замовчуванням | Що це |
| --- | --- | --- | --- |
| \`items\` | \`ProjectRailEntry[]\` | немає, обовʼязковий | пункти в порядку блоків на сторінці |
| \`className\` | \`string\` | немає | лише для розташування на сторінці |

Кожен пункт має \`number\`, \`project\` (\`miri\`, \`rentflow\`, \`studio\` або \`sema\`), \`label\` (доступна назва з номером) і \`targetId\` (\`id\` блока на сторінці).

\`count\` у Controls не є пропом. Він змінює кількість пунктів і блоків у прикладі.

### Поведінка

- Поточним стає блок, який дійшов до середини вікна. Якщо таких кілька, береться перший.
- Кільце плавно переходить до поточного пункту. Якщо поточного немає, кільце приховане.
- Клік прокручує сторінку до блока.
- Зі зменшеним рухом кільце й прокрутка перемикаються одразу.
- Якщо блока з таким \`id\` немає, пункт нічого не робить. Решта працюють.
- До \`lg\` це горизонтальний ряд із фоном і лінією. Від \`lg\` це стовпчик.

У вкладці Docs перший приклад вузький, тому там видно ряд. Стовпчик дивіться на вкладці Canvas у широкому вікні.

### Доступність

Це \`<nav aria-label="Projects">\` з кнопками. Поточна кнопка має \`aria-current="true"\`. Поточний пункт видно не лише за кольором, а й за кільцем. Кільце декоративне.

### Коли використовувати

Для переходу між проєктами, які йдуть один за одним на \`canvas\`. Не використовуйте на \`canvas-dark\`, як меню сайту чи вкладки.

### Додавання на сторінку

Місце рейки задає сторінка:

- ширина колонки: клас \`lg:w-rail\` (токен \`--container-rail\`), лише для цієї рейки;
- відстань до карток: у макеті 24 px, на вузькому екрані 16 px;
- sticky-позиція рейки, а на вузькому екрані ще ряд на всю ширину;
- на картках \`id\`, як у \`targetId\`, і \`scroll-margin\`, щоб рейка не закривала верх;
- safe-area на телефоні.

### Відомі обмеження

- Ряд, який не вміщається, прокручується лише вручну. Поточний пункт може бути за краєм.
- Пункт біля краю такого ряду з фокусом клавіатури може бути видно не повністю.
- Стовпчик, вищий за вікно, не прокручується.
- Блок, доданий на сторінку пізніше за рейку, вона не помітить.
- Низький блок на початку чи в кінці сторінки може не стати поточним.

### Токени

\`canvas\`, \`line\`, \`text\`, \`size-ring\`, \`rounded-control\`, \`ease-ring\`. Решта в \`ProjectRailItem\`.

### Як брати в код

\`\`\`tsx
import { ProjectRail } from "@/components/ProjectRail";

<ProjectRail
  items={[
    { number: 1, project: "miri", label: "Go to project 01, Miri", targetId: "project-miri" },
  ]}
/>
\`\`\`
`;

/** Проєкти для заглушок. Після четвертого кольори повторюються, а назви вигадані. */
const stubs = [
  { project: "miri", name: "Miri", fill: "bg-project-miri" },
  { project: "rentflow", name: "RentFlow", fill: "bg-project-rentflow" },
  { project: "studio", name: "Studio", fill: "bg-project-studio" },
  { project: "sema", name: "SeMA", fill: "bg-project-sema" },
] as const;

function makeStubs(count: number, idPrefix: string) {
  return Array.from({ length: count }, (_, index) => {
    const stub = stubs[index % stubs.length];
    const number = index + 1;
    const name = index < stubs.length ? stub.name : "Example";

    return {
      fill: stub.fill,
      name,
      entry: {
        number,
        project: stub.project,
        label: `Go to project ${String(number).padStart(2, "0")}, ${name}`,
        targetId: `${idPrefix}-${number}`,
      } satisfies ProjectRailEntry,
    };
  });
}

/** Приклад сторінки з блоками-заглушками. Розташування задає приклад, а не компонент. */
function Demo({
  count,
  idPrefix,
  isShort = false,
}: {
  count: number;
  idPrefix: string;
  /** Низькі блоки для сторінки docs. */
  isShort?: boolean;
}) {
  const blocks = makeStubs(count, idPrefix);
  const height = isShort ? "py-16" : "py-6";
  /*
   * Висоти задано в style: це лише приклад. Блок має бути не нижчим за пів вікна,
   * інакше після кліку він не дійде до середини й поточним стане інший.
   */
  const blockStyle = isShort ? undefined : { minHeight: "50vh" };
  /* Місце після блоків: щоб останній дійшов до верху, а в кінці кільце зникло. */
  const endStyle = isShort ? undefined : { minHeight: "70vh" };

  return (
    /* Ширину задано в style: це лише рамка прикладу, токена для неї немає. */
    <div className="mx-auto bg-canvas px-6 text-text" style={{ maxWidth: 720 }}>
      <p className="py-6">Прокрутіть вниз або клацніть на пункт.</p>
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <ProjectRail
          /* Після зміни count рейка шукає блоки заново. */
          key={count}
          items={blocks.map((block) => block.entry)}
          className="sticky top-0 z-10 max-lg:-mx-6 max-lg:px-6 lg:top-6 lg:w-rail lg:shrink-0 lg:self-start"
        />
        <div className="flex flex-1 flex-col gap-8">
          {blocks.map((block) => (
            <section
              key={block.entry.targetId}
              id={block.entry.targetId}
              className={`scroll-mt-16 rounded-card px-6 lg:scroll-mt-6 ${height} ${block.fill}`}
              style={blockStyle}
            >
              <h3 className="text-display-s">
                {String(block.entry.number).padStart(2, "0")} · {block.name}
              </h3>
            </section>
          ))}
        </div>
      </div>
      <p className="py-16" style={endStyle}>
        Кінець прикладу. Тут кільця знову немає.
      </p>
    </div>
  );
}

function DocsPage() {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
      <h3>Шість пунктів</h3>
      <p>Прокручуйте сторінку docs, щоб побачити рух кільця.</p>
      {/* Unstyled: щоб стилі сторінки docs не змінювали вигляд прикладу. */}
      <Unstyled>
        <Demo count={6} idPrefix="rail-six" isShort />
      </Unstyled>
    </>
  );
}

/** Перемикач прикладу, а не проп компонента. */
type StoryArgs = { count: number };

const meta = {
  title: "Components/ProjectRail",
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "range", min: 1, max: 10, step: 1 },
      description: "Лише приклад: кількість пунктів і блоків.",
    },
  },
  args: { count: 4 },
  render: (args) => <Demo {...args} idPrefix="rail-demo" />,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: { component: description },
      page: DocsPage,
      /* Окрема рамка: прокрутка й sticky поводяться як на справжній сторінці. */
      story: { inline: false, iframeHeight: 560 },
    },
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
