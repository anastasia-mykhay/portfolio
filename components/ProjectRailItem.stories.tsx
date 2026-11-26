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
Пункт рейки проєктів: кнопка з крапкою й номером, наприклад «01». Лежить на світлому фоні \`canvas\`.

### Параметри

Усі пропси обовʼязкові. Значень за замовчуванням немає.

| Проп | Тип | Що це |
| --- | --- | --- |
| \`number\` | \`number\` | номер проєкту, щонайменше дві цифри: 1 стає «01» |
| \`project\` | \`"miri" \\| "rentflow" \\| "studio" \\| "sema"\` | колір крапки в current і hover |
| \`isCurrent\` | \`boolean\` | чи пункт поточний |
| \`label\` | \`string\` | доступна назва, наприклад «Go to project 01, Miri» |
| \`onClick\` | \`() => void\` | що зробити після кліку |

### Варіанти і стани

Варіант один. Колір крапки залежить від \`project\`.

| Стан | Вигляд | Як перевірити |
| --- | --- | --- |
| default | номер \`text-muted\`, крапка \`line\` | вимкнути \`isCurrent\` |
| current | номер \`text\`, крапка кольору проєкту | увімкнути \`isCurrent\` |
| hover | вигляд як у current | навести мишу на непоточний пункт |
| focus-visible | навколо кнопки контур \`text\` | натиснути Tab |

Крапка змінює колір плавно. Зі зменшеним рухом вона змінює його одразу. На дотикових екранах hover немає. Стану disabled немає.

Кільце, прокрутку й розташування пунктів описано в \`ProjectRail\` (Components/ProjectRail).

### Доступність

Це кнопка. Скрінрідер читає \`label\`, а не видимий номер. Тому \`label\` має містити цей номер. Поточна кнопка має \`aria-current="true"\`. Крапка декоративна.

Без кільця поточний пункт видно лише за кольором. Непоточний пункт під мишею виглядає так само.

### Токени

\`text\`, \`text-muted\`, \`line\`, кольори \`project-*\`, \`text-label\`. Крапка це компонент \`Marker\`. Фон \`canvas\` задає батьківський елемент.

### Контраст

Номери на \`canvas\` проходять норму 4.5 : 1: \`text-muted\` має 6.81 : 1, \`text\` має 15.49 : 1. Крапки \`line\`, \`project-miri\`, \`project-rentflow\` і \`project-studio\` нижче 3 : 1. Крапка \`project-sema\` вище.

### Коли використовувати

Лише в рейці проєктів на \`canvas\`. На сторінці беріть готову \`ProjectRail\`.

Не використовуйте на \`canvas-dark\`, як посилання меню чи звичайну кнопку.

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

\`onClick\` це функція, тому пункт беруть лише в клієнтському компоненті.
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
