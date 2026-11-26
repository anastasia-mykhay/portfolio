import {
  Controls,
  Description,
  Primary,
  Title,
  Unstyled,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RoleItem } from "./RoleItem";

const description = `
Пункт у картці проєкту: крапка-маркер ліворуч, праворуч назва великими жирними літерами, а під назвою текст. У макеті в кожній картці два такі пункти: «Question» з порожньою крапкою і «Decision» із заповненою. Компонент не привʼязаний до цих слів: назва й текст можуть бути будь-які.

### Параметри

| Проп | Тип | За замовчуванням | Що це |
| --- | --- | --- | --- |
| \`title\` | \`string\` | немає, обовʼязковий | назва пункту |
| \`text\` | \`string\` | немає, обовʼязковий | текст під назвою |
| \`marker\` | \`"hollow" \\| "filled"\` | немає, обовʼязковий | вигляд крапки |

Великі літери в назві додає сам компонент, тому передавайте її звичайним написанням.

### Варіанти і стани

Два варіанти крапки: \`hollow\` і \`filled\`. Розмір один. Компонент неінтерактивний, тому станів hover, focus і disabled немає, і фокус клавішею Tab на нього не переходить.

### Розташування

- Крапка стоїть в одному рядку з назвою, по центру її першого рядка. Для цього обгортка крапки має висоту одного рядка назви (\`h-lh\`).
- Текст вирівняний по лівому краю назви. Довгий текст і довга назва переносяться під назвою, а не під крапкою.
- Між назвою й текстом проміжку немає.
- Фону, рамки й зовнішніх відступів немає. Лінію над пунктами, проміжок між пунктами й колір картки задає картка.

### Доступність

Назва не є заголовком: це звичайний абзац, і в списку заголовків сторінки її немає. Крапка декоративна, скрінрідер її пропускає. Тому назва й текст мають бути зрозумілі без крапки.

### Токени

- Колір: \`text\` (назва, текст і крапка, яка бере колір тексту).
- Текст: \`text-label-strong\` і \`uppercase\` (назва), \`text-body\` (текст).
- Крапка: компонент \`Marker\`, який використовує \`size-dot\` і \`rounded-control\`.
- Відступи: \`gap-4\` (між крапкою і назвою з текстом).
- Тіні, фону й рамки немає.

### Контраст

Компонент не має власного фону. Він лежить на картці, тому контраст залежить від кольору проєкту.

| Пара | Контраст | Потрібно |
| --- | --- | --- |
| \`text\` на \`project-miri\` | 7.27 : 1 | 4.5 : 1 |
| \`text\` на \`project-rentflow\` | 11.89 : 1 | 4.5 : 1 |
| \`text\` на \`project-studio\` | 8.90 : 1 | 4.5 : 1 |
| \`text\` на \`project-sema\` | 4.80 : 1 | 4.5 : 1 |

Найменший запас на \`project-sema\`.

### Коли використовувати

Для пунктів «Question» і «Decision» або подібних пар «назва і пояснення» в картці проєкту на кольорі проєкту.

Не використовуйте:

- на темному фоні \`canvas-dark\`: колір \`text\` там не читається;
- для абзаців hero: у них інша будова і немає назви;
- як заголовок розділу, кнопку чи посилання.

Анімація «падіння» крапки «Decision» з макета в компонент не входить.

### Як брати в код

\`\`\`tsx
import { RoleItem } from "@/components/RoleItem";

<RoleItem
  marker="hollow"
  title="Question"
  text="How should AI speak to an owner, a tenant and a manager about the same property?"
/>
<RoleItem
  marker="filled"
  title="Decision"
  text="Each role gets its own dashboard, where AI suggests next to the numbers and the person decides."
/>
\`\`\`
`;

/** Пари з макета. Кольори тут лише приклад для документації. */
const examples = [
  {
    project: "Miri",
    background: "bg-project-miri",
    question:
      "How should the concierge get to know a guest who doesn’t want to be asked questions?",
    decision:
      "Preferences come from behavior, not questionnaires. It offers one suggestion at a time and declining works as a refinement.",
  },
  {
    project: "RentFlow",
    background: "bg-project-rentflow",
    question:
      "How should AI speak to an owner, a tenant and a manager about the same property?",
    decision:
      "Each role gets its own dashboard, where AI suggests next to the numbers and the person decides.",
  },
  {
    project: "Studio",
    background: "bg-project-studio",
    question:
      "How can a designer use AI to assemble a concept board and still feel that every choice is theirs?",
    decision:
      "The AI only searches and combines real catalog items. The designer swaps any piece, the budget rebalances, and the client approves.",
  },
  {
    project: "SeMA",
    background: "bg-project-sema",
    question:
      "What happens when the findings of a UX audit are applied to an existing museum website?",
    decision:
      "The audit set the direction. The redesign followed it through the navigation, the exhibitions and the collection page.",
  },
];

/** Пара пунктів. Проміжок gap-3 задає приклад, а не компонент. */
function Pair({ question, decision }: { question: string; decision: string }) {
  return (
    <div className="flex flex-col gap-3">
      <RoleItem marker="hollow" title="Question" text={question} />
      <RoleItem marker="filled" title="Decision" text={decision} />
    </div>
  );
}

function DocsPage() {
  const [miri] = examples;

  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
      {/* Unstyled: щоб стилі сторінки docs не змінювали вигляд прикладів. */}
      <h3>Пара «Question» і «Decision» на кольорах проєктів</h3>
      <Unstyled>
        <div className="flex flex-col gap-4">
          {examples.map(({ project, background, question, decision }) => (
            <div
              key={project}
              className={`flex flex-col gap-4 p-6 text-text ${background}`}
            >
              <p className="text-label uppercase">{project}</p>
              <Pair question={question} decision={decision} />
            </div>
          ))}
        </div>
      </Unstyled>
      <h3>Довга назва і довгий текст</h3>
      <Unstyled>
        <div className="bg-project-studio p-6">
          <RoleItem
            marker="filled"
            title="A much longer title that has to wrap onto a second line when there is not enough room for it in one row of the card"
            text={`${miri.question} ${miri.decision} ${examples[2].question} ${examples[2].decision}`}
          />
        </div>
      </Unstyled>
      <h3>Вузький екран</h3>
      <p>Ширина прикладу 320 px, як у вузького телефона.</p>
      <Unstyled>
        {/* Ширину задано в style: це лише рамка прикладу, токена для неї немає. */}
        <div className="bg-project-sema p-4" style={{ width: 320 }}>
          <Pair question={miri.question} decision={miri.decision} />
        </div>
      </Unstyled>
    </>
  );
}

const meta = {
  title: "Components/RoleItem",
  component: RoleItem,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Назва пункту." },
    text: { control: "text", description: "Текст під назвою." },
    marker: {
      control: "inline-radio",
      options: ["hollow", "filled"],
      description: "Вигляд крапки.",
    },
  },
  args: {
    title: "Question",
    text: "How should the concierge get to know a guest who doesn’t want to be asked questions?",
    marker: "hollow",
  },
  parameters: {
    docs: { description: { component: description }, page: DocsPage },
  },
  decorators: [
    (Story) => (
      <div className="bg-project-miri p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RoleItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
