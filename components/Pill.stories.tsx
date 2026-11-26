import {
  Controls,
  Description,
  Primary,
  Title,
  Unstyled,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pill } from "./Pill";

const description = `
Короткий текстовий тег проєкту, наприклад «Design system»: темна плашка зі світлим текстом і повністю круглими краями. Лежить на кольорових картках проєктів. Це не кнопка і не посилання: натиснути на неї не можна.

### Параметри

| Проп | Тип | За замовчуванням | Що це |
| --- | --- | --- | --- |
| \`children\` | \`string\` | немає, обовʼязковий | текст тегу |

### Варіанти і стани

Варіант один, розмір один. Елемент неінтерактивний, тому станів hover, focus і disabled немає, і фокус клавішею Tab на нього не переходить.

Великих літер компонент не додає: текст показується так, як його передано.

### Ряд плашок

Компонент не має зовнішніх відступів. Проміжок між плашками (\`gap-2\`) і перенесення на новий рядок задає той, хто складає ряд, тобто картка проєкту. Окремого компонента для ряду немає: ряди нижче на цій сторінці лише приклад.

### Токени

- Кольори: \`canvas-dark\` (фон), \`text-on-dark\` (текст).
- Текст: \`text-small\`.
- Радіус: \`rounded-control\`.
- Відступи всередині: \`py-2\` (зверху й знизу), \`px-4\` (з боків).
- Тіні й рамки немає.

### Контраст

| Пара | Контраст | Потрібно |
| --- | --- | --- |
| \`text-on-dark\` на \`canvas-dark\` (текст плашки) | 16.29 : 1 | 4.5 : 1 |

Текст лежить на власному фоні плашки, тому цей контраст однаковий на картці будь-якого кольору.

### Коли використовувати

Для тегів проєкту в картці проєкту.

Не використовуйте замість кнопки, посилання чи фільтра: плашка нічого не робить і не має вибраного стану.

### Як брати в код

\`\`\`tsx
import { Pill } from "@/components/Pill";

<Pill>Design system</Pill>
\`\`\`
`;

/** Тексти тегів із макета. Ряди тут лише приклад для документації. */
const examples = [
  {
    project: "Miri",
    background: "bg-project-miri",
    tags: ["Human–AI interaction", "Korean service culture", "Design system"],
  },
  {
    project: "RentFlow",
    background: "bg-project-rentflow",
    tags: ["Human–AI interaction", "Information architecture"],
  },
  {
    project: "Studio",
    background: "bg-project-studio",
    tags: ["Human–AI interaction", "Design tools", "Real product data"],
  },
  {
    project: "SeMA",
    background: "bg-project-sema",
    tags: ["UX audit", "Navigation redesign", "Visual hierarchy"],
  },
];

function DocsPage() {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
      <h3>Приклади на кольорах проєктів</h3>
      {/* Unstyled: щоб стилі сторінки docs не змінювали вигляд плашок. */}
      <Unstyled>
        <div className="flex flex-col gap-4">
          {examples.map(({ project, background, tags }) => (
            <div key={project} className={`flex flex-col gap-4 p-6 ${background}`}>
              <p className="text-label uppercase text-text">{project}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Unstyled>
    </>
  );
}

const meta = {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text", description: "Текст тегу." },
  },
  args: { children: "Design system" },
  parameters: {
    docs: { description: { component: description }, page: DocsPage },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
