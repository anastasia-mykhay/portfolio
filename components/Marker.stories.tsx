import {
  Controls,
  Description,
  Primary,
  Title,
  Unstyled,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Marker } from "./Marker";

const description = `
Маленька кругла крапка, яку ставлять як маркер перед текстом. У картці проєкту порожня крапка стоїть біля «Question», а заповнена біля «Decision». Такі самі форми мають крапки біля двох абзаців hero. Крапка декоративна: зміст передає текст поруч.

### Параметри

| Проп | Тип | За замовчуванням | Що це |
| --- | --- | --- | --- |
| \`variant\` | \`"hollow" \\| "filled"\` | немає, обовʼязковий | вигляд крапки |
| \`className\` | \`string\` | немає, необовʼязковий | класи самої крапки, щоб задати їй колір |

### Варіанти і стани

- \`hollow\`: лише контур 1 px, без заливки.
- \`filled\`: суцільна заливка, без окремої рамки.

Розмір один. Крапка неінтерактивна, тому станів hover, focus і disabled немає, і фокус клавішею Tab на неї не переходить. Вона має \`aria-hidden="true"\`: скрінрідер її пропускає. Тому поруч завжди має бути текст, зрозумілий без крапки.

### Колір

За замовчуванням крапка бере колір тексту батьківського елемента (currentColor): і для контуру, і для заливки. Окремого пропса кольору немає.

Якщо крапка має відрізнятися від тексту, передайте клас кольору самій крапці: \`className="text-project-miri"\`. Колір тексту поруч при цьому не змінюється. Клас \`text-*\` тут фарбує лише крапку, тобто це маркер, а не текст. У hero:

- заповнена крапка: \`text-project-miri\`;
- порожня крапка: \`text-text-on-dark\`, хоча абзац біля неї має колір \`text-muted-on-dark\`.

### Розташування

Компонент не має зовнішніх відступів і не вирівнює себе щодо тексту: проміжок і положення задає батьківський елемент. У flex-рядку крапка не стискається. Вирівнювання в прикладах нижче лише для документації, це не частина компонента.

### Токени

- Розмір: \`size-dot\`. Цей токен лише для розміру, не для відступів.
- Радіус: \`rounded-control\`.
- Колір: currentColor (\`bg-current\` для заливки, контур \`border\` бере той самий колір). Власного токена кольору компонент не має.
- Товщина контуру: клас \`border\`, 1 px. Окремого токена немає.
- Відступів, тіні й тексту немає.

### Контраст

Крапка не є текстом. Для графічних елементів орієнтир WCAG 3 : 1. Крапка тут декоративна, тому це не обовʼязкова вимога, але всі пари нижче її виконують.

| Пара | Де | Контраст |
| --- | --- | --- |
| \`text\` на \`project-miri\` | картка Miri | 7.27 : 1 |
| \`text\` на \`project-rentflow\` | картка RentFlow | 11.89 : 1 |
| \`text\` на \`project-studio\` | картка Studio | 8.90 : 1 |
| \`text\` на \`project-sema\` | картка SeMA | 4.80 : 1 |
| \`project-miri\` на \`canvas-dark\` | заповнена крапка в hero | 7.27 : 1 |
| \`text-on-dark\` на \`canvas-dark\` | порожня крапка в hero | 16.29 : 1 |

### Коли використовувати

- Як маркер перед «Question» (\`hollow\`) і «Decision» (\`filled\`) у картці проєкту.
- Як маркер перед двома абзацами hero.
- Як крапка всередині пункту рейки (\`ProjectRailItem\`): колір і його зміну задає пункт.

### Коли не використовувати

- Для анімованих крапок hero, крапок у «Back to top» і біля заголовка «Projects», а також для кілець: це інші елементи.
- Як кнопку, перемикач чи індикатор стану: крапка нічого не робить і не має вибраного стану.
- Як єдиний носій змісту: скрінрідер її не бачить.

### Як брати в код

\`\`\`tsx
import { Marker } from "@/components/Marker";

// Колір береться з тексту батьківського елемента
<Marker variant="hollow" />
<Marker variant="filled" />

// Власний колір крапки, як у hero
<Marker variant="filled" className="text-project-miri" />
<Marker variant="hollow" className="text-text-on-dark" />
\`\`\`
`;

/** Кольори проєктів для прикладів. Лише для документації. */
const cards = [
  { project: "Miri", background: "bg-project-miri" },
  { project: "RentFlow", background: "bg-project-rentflow" },
  { project: "Studio", background: "bg-project-studio" },
  { project: "SeMA", background: "bg-project-sema" },
];

/** Тексти абзаців hero з макета. Лише для документації. */
const heroExamples = [
  {
    variant: "filled",
    markerColor: "text-project-miri",
    textColor: "text-text-on-dark",
    text: "Turning AI features into screens built around the person using them.",
  },
  {
    variant: "hollow",
    markerColor: "text-text-on-dark",
    textColor: "text-text-muted-on-dark",
    text: "Four projects, each shown from the first question to the final screens, with the reasoning in between.",
  },
] as const;

/** Крапка з підписом. Вирівнювання тут задає приклад, а не компонент. */
function Sample({
  variant,
  label,
}: {
  variant: "hollow" | "filled";
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Marker variant={variant} />
      <span className="text-label-strong uppercase">{label}</span>
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
      {/* Unstyled: щоб стилі сторінки docs не змінювали вигляд прикладів. */}
      <h3>Обидва варіанти</h3>
      <Unstyled>
        <div className="flex gap-8 bg-canvas p-6 text-text">
          <Sample variant="hollow" label="hollow" />
          <Sample variant="filled" label="filled" />
        </div>
      </Unstyled>
      <h3>На кольорах проєктів: колір text</h3>
      <Unstyled>
        <div className="flex flex-col gap-4">
          {cards.map(({ project, background }) => (
            <div
              key={project}
              className={`flex flex-col gap-3 p-6 text-text ${background}`}
            >
              <p className="text-label uppercase">{project}</p>
              <Sample variant="hollow" label="Question" />
              <Sample variant="filled" label="Decision" />
            </div>
          ))}
        </div>
      </Unstyled>
      <h3>На canvas-dark: project-miri та text-on-dark</h3>
      <Unstyled>
        <div className="flex flex-col gap-4 bg-canvas-dark p-6">
          {heroExamples.map(({ variant, markerColor, textColor, text }) => (
            <p
              key={variant}
              className={`flex items-baseline gap-6 text-body ${textColor}`}
            >
              <Marker variant={variant} className={markerColor} />
              <span>{text}</span>
            </p>
          ))}
        </div>
      </Unstyled>
    </>
  );
}

const meta = {
  title: "Components/Marker",
  component: Marker,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["hollow", "filled"],
      description: "Вигляд крапки.",
    },
  },
  args: { variant: "hollow" },
  parameters: {
    // У Controls лише варіант: className потрібен тільки в коді.
    controls: { include: ["variant"] },
    docs: { description: { component: description }, page: DocsPage },
  },
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
