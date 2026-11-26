import {
  Controls,
  Description,
  Primary,
  Title,
  Unstyled,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";
import { NavLink } from "./NavLink";

const description = `
Одне текстове посилання меню у верхній смузі hero, наприклад «Projects» чи «Contact». Лежить на темному фоні \`canvas-dark\`. Без заливки, рамки й підкреслення. Великі літери додає сам компонент.

### Параметри

| Проп | Тип | За замовчуванням | Що це |
| --- | --- | --- | --- |
| \`children\` | \`string\` | немає, обовʼязковий | текст посилання |
| \`href\` | \`string\` | немає, обовʼязковий | адреса, наприклад \`#projects\` |

### Варіанти і стани

Варіант і розмір один.

| Стан | Вигляд | Як перевірити |
| --- | --- | --- |
| default | текст \`text-on-dark\` | нічого не робити |
| hover | текст \`link-hover\` | навести мишу |
| focus-visible | текст \`text-on-dark\`, навколо контур 2 px кольору \`text-on-dark\` з відступом 4 px | клацнути на порожньому темному місці прикладу й натиснути Tab |

Колір змінюється одразу, без плавного переходу. Станів disabled, active і «поточна сторінка» немає. Перемикача стану в Controls немає: hover і focus-visible тут справжні.

У прикладах на цій сторінці й в історії клік нікуди не переходить, щоб перегляд Storybook не зламався. На сайті це звичайне посилання.

### Доступність

Це справжнє посилання (\`<a>\` з \`href\`). Для адрес, що починаються з \`#\`, це звичайний \`<a>\`, для решти \`Link\` з Next.js. На нього переходять клавішею Tab, а відкривають клавішею Enter.

### Токени

- Кольори: \`text-on-dark\` (текст і контур фокуса), \`link-hover\` (текст на hover), \`canvas-dark\` (фон, його задає смуга, а не компонент).
- Текст: \`text-label\` і \`uppercase\`.
- Відступів, радіусів і тіней компонент не має.

### Контраст

| Пара | Контраст | Потрібно |
| --- | --- | --- |
| \`text-on-dark\` на \`canvas-dark\` (текст у default і focus) | 16.29 : 1 | 4.5 : 1 |
| \`link-hover\` на \`canvas-dark\` (текст на hover) | 7.27 : 1 | 4.5 : 1 |
| контур фокуса \`text-on-dark\` на \`canvas-dark\` | 16.29 : 1 | 3 : 1 |

### Ряд посилань

Компонент не має зовнішніх відступів. Проміжок між посиланнями (\`gap-8\`) задає той, хто складає ряд, тобто верхня смуга hero. Ряд нижче на цій сторінці лише приклад.

### Коли використовувати

Для меню на темному фоні \`canvas-dark\`.

Не використовуйте:

- на світлому фоні й на картках проєктів: білий текст там не читається;
- замість кнопки: для дії на сторінці потрібна кнопка, а не посилання;
- для email у футері, «Back to top» і кнопок рейки проєктів: це інші елементи.

### Як брати в код

\`\`\`tsx
import { NavLink } from "@/components/NavLink";

<NavLink href="#projects">Projects</NavLink>
\`\`\`
`;

/** Темний фон прикладу. Клік скасовуємо, щоб перегляд Storybook нікуди не переходив. */
function DarkCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex justify-center bg-canvas-dark p-8"
      onClickCapture={(event) => event.preventDefault()}
    >
      {children}
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
      <h3>Приклад ряду</h3>
      {/* Unstyled: щоб стилі сторінки docs не змінювали вигляд посилань. */}
      <Unstyled>
        <DarkCanvas>
          <div className="flex gap-8">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
        </DarkCanvas>
      </Unstyled>
    </>
  );
}

const meta = {
  title: "Components/NavLink",
  component: NavLink,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text", description: "Текст посилання." },
    href: { control: "text", description: "Адреса посилання." },
  },
  args: { children: "Projects", href: "#projects" },
  parameters: {
    nextjs: { appDirectory: true },
    docs: { description: { component: description }, page: DocsPage },
  },
  decorators: [
    (Story) => (
      <DarkCanvas>
        <Story />
      </DarkCanvas>
    ),
  ],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
