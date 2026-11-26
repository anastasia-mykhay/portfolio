import {
  Controls,
  Description,
  Primary,
  Title,
  Unstyled,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { fn } from "storybook/test";
import { ProjectRailItem } from "./ProjectRailItem";

const description = `
Один пункт рейки в блоці Projects: кнопка з крапкою й номером проєкту, наприклад «01». Лежить на світлому фоні \`canvas\`. Без заливки й рамки.

### Параметри

Усі пропси обовʼязкові, значень за замовчуванням немає.

| Проп | Тип | Що це |
| --- | --- | --- |
| \`number\` | \`number\` | номер проєкту. Показується щонайменше двома цифрами: 1 стає «01», 10 лишається «10» |
| \`project\` | \`"miri" \\| "rentflow" \\| "studio" \\| "sema"\` | колір крапки поточного пункту й пункту під мишею |
| \`isCurrent\` | \`boolean\` | чи цей пункт поточний |
| \`label\` | \`string\` | доступна назва, наприклад «Go to project 01, Miri» |
| \`onClick\` | \`() => void\` | що зробити після кліку |

Кількість пунктів компонент не знає і не обмежує. Назви розділів поруч із номером немає.

### Стани

| Стан | Номер | Крапка | \`aria-current\` | Як перевірити |
| --- | --- | --- | --- | --- |
| default | \`text-muted\` | \`line\` | немає | \`isCurrent\` вимкнено |
| current | \`text\` | колір проєкту | \`"true"\` | увімкнути \`isCurrent\` |
| hover (непоточний) | \`text\` | колір проєкту | немає | навести мишу |
| focus-visible | як у default або current, навколо кнопки контур 2 px кольору \`text\` з відступом 2 px | без змін | без змін | клацнути на порожньому місці прикладу й натиснути Tab |

Колір крапки змінюється плавно за 400 мс, колір номера змінюється одразу. Зі зменшеним рухом (\`prefers-reduced-motion\`) крапка змінює колір без переходу. Hover діє лише на пристроях, де є наведення (не на дотик). Стану disabled немає. Перемикача hover і focus-visible в Controls немає: вони тут справжні.

### Що належить рейці, а не пункту

Рейка це компонент \`ProjectRail\` (Components/ProjectRail). Вона відповідає за:

- кільце, яке рухається між крапками;
- вибір поточного пункту й відстеження прокрутки: пункт лише отримує \`isCurrent\`;
- прокрутку після кліку: пункт лише викликає \`onClick\`;
- список пунктів, а на вузьких екранах ще фон і лінію.

Sticky-позицію й місце рейки на сторінці задає сторінка.

### Розташування

Висота пункту \`h-12\`, відступ зліва \`pl-1\`. Власної ширини пункт не задає. У flex-колонці чи grid-комірці він розтягується на ширину батька. Прямо у flex-рядку він має ширину свого вмісту, тому в горизонтальній рейці кожен пункт кладуть в обгортку \`flex w-16 flex-col\` (приклад нижче). Контур фокуса виходить на 4 px за межі кнопки: контейнер не повинен його обрізати.

### Доступність

Це \`<button type="button">\`. Назву для скрінрідера задає \`label\`: вона замінює видимий номер, тому має містити його тими самими цифрами. Крапка декоративна (\`aria-hidden\`).

**Обмеження самого пункту.** Без кільця поточний пункт на вигляд відрізняється від інших лише кольором номера й крапки, а непоточний пункт під мишею виглядає так само, як поточний. Тому беріть пункт через \`ProjectRail\`: її кільце показує поточний пункт не лише кольором. Скрінрідер дізнається про нього з \`aria-current\`.

### Токени

- Кольори: \`canvas\` (фон, його задає батько), \`text\` (номер у current і hover, контур фокуса), \`text-muted\` (номер у default), \`line\` (крапка в default), \`project-miri\`, \`project-rentflow\`, \`project-studio\`, \`project-sema\` (крапка).
- Текст: \`text-label\` і \`uppercase\`.
- Крапка: компонент \`Marker\` (\`filled\`), який використовує \`size-dot\` і \`rounded-control\`.
- Відступи: \`gap-3\`, \`pl-1\`. Висота: \`h-12\`.
- Рух: \`transition-colors\`, \`duration-400\`, \`motion-reduce:transition-none\`.

### Контраст на canvas

| Пара | Контраст | Орієнтир WCAG |
| --- | --- | --- |
| \`text-muted\` (номер у default) | 6.81 : 1 | 4.5 : 1, виконано |
| \`text\` (номер у current і hover, контур фокуса) | 15.49 : 1 | 4.5 : 1, виконано |
| \`line\` (крапка в default) | 1.67 : 1 | 3 : 1, нижче |
| \`project-miri\` (крапка) | 2.13 : 1 | 3 : 1, нижче |
| \`project-rentflow\` (крапка) | 1.30 : 1 | 3 : 1, нижче |
| \`project-studio\` (крапка) | 1.74 : 1 | 3 : 1, нижче |
| \`project-sema\` (крапка) | 3.23 : 1 | 3 : 1, виконано |

Орієнтир 3 : 1 для крапки обовʼязковий лише тоді, коли без неї не можна зрозуміти елемент чи його стан. Пункт називає номер, але стан current крапка показує разом із кольором номера.

### Коли використовувати

Лише як пункт рейки проєктів на \`canvas\`. Готова рейка це \`ProjectRail\`, на сторінці беріть її, а не окремі пункти.

Не використовуйте на темному фоні \`canvas-dark\`, як посилання меню чи звичайну кнопку.

### Як брати в код

\`\`\`tsx
import { ProjectRailItem } from "@/components/ProjectRailItem";

<ProjectRailItem
  number={1}
  project="miri"
  isCurrent={currentIndex === 0}
  label="Go to project 01, Miri"
  onClick={() => goToProject(0)}
/>
\`\`\`

\`onClick\` це функція, тому пункт беруть у клієнтському компоненті (рейка з \`"use client"\`). Передати \`onClick\` із серверного компонента Next.js не дозволяє. Самому пункту \`"use client"\` не потрібен: він стає клієнтським разом із рейкою, яка його імпортує.
`;

type ItemProps = ComponentProps<typeof ProjectRailItem>;

/** Проєкти для прикладів. Лише для документації. */
const examples = [
  { number: 1, project: "miri", name: "Miri" },
  { number: 2, project: "rentflow", name: "RentFlow" },
  { number: 3, project: "studio", name: "Studio" },
  { number: 4, project: "sema", name: "SeMA" },
] as const;

/** Пункт прикладу. Клік у прикладах нічого не робить. */
function Example({
  number,
  project,
  name,
  isCurrent = false,
}: {
  number: number;
  project: ItemProps["project"];
  name: string;
  isCurrent?: boolean;
}) {
  return (
    <ProjectRailItem
      number={number}
      project={project}
      isCurrent={isCurrent}
      label={`Go to project ${String(number).padStart(2, "0")}, ${name}`}
      onClick={() => {}}
    />
  );
}

function DocsPage() {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
      {/* Unstyled: щоб стилі сторінки docs не змінювали вигляд прикладів. */}
      <h3>Default і current для чотирьох кольорів</h3>
      <p>У кожному рядку ліворуч default, праворуч current.</p>
      <Unstyled>
        <div className="flex flex-col gap-2 bg-canvas p-6">
          {examples.map((example) => (
            <div key={example.project} className="flex items-center gap-8">
              <Example {...example} />
              <Example {...example} isCurrent />
              <span className="text-small text-text-muted">{example.name}</span>
            </div>
          ))}
        </div>
      </Unstyled>
      <h3>Номери більше 04</h3>
      <p>
        Кольорів чотири, а номер може бути будь-яким. Назви тут вигадані для
        прикладу.
      </p>
      <Unstyled>
        <div className="flex gap-8 bg-canvas p-6">
          <Example number={5} project="miri" name="Example" />
          <Example number={9} project="rentflow" name="Example" isCurrent />
          <Example number={10} project="studio" name="Example" />
        </div>
      </Unstyled>
      <h3>Горизонтальний ряд із пунктами шириною w-16</h3>
      <p>
        Ширину задає обгортка кожного пункту. Це приклад розташування, а не
        готова рейка (готова: Components/ProjectRail).
      </p>
      <Unstyled>
        <div className="flex bg-canvas p-6">
          {examples.map((example, index) => (
            <div key={example.project} className="flex w-16 flex-col">
              <Example {...example} isCurrent={index === 0} />
            </div>
          ))}
        </div>
      </Unstyled>
    </>
  );
}

const meta = {
  title: "Components/ProjectRailItem",
  component: ProjectRailItem,
  tags: ["autodocs"],
  argTypes: {
    number: {
      control: { type: "number", min: 1, step: 1 },
      description: "Номер проєкту.",
    },
    project: {
      control: "select",
      options: ["miri", "rentflow", "studio", "sema"],
      description: "Колір проєкту.",
    },
    isCurrent: { control: "boolean", description: "Чи пункт поточний." },
    label: { control: "text", description: "Доступна назва кнопки." },
    onClick: { control: false, description: "Що зробити після кліку." },
  },
  args: {
    number: 1,
    project: "miri",
    isCurrent: false,
    label: "Go to project 01, Miri",
    onClick: fn(),
  },
  parameters: {
    docs: { description: { component: description }, page: DocsPage },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center bg-canvas p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectRailItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
