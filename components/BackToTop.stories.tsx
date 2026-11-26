import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BackToTop } from "./BackToTop";

const description = `
Кнопка повернення на початок сторінки з футера: текст «Back to top» і колонка з чотирьох крапок у кольорах проєктів з кільцем навколо однієї з них. Без заливки й рамки.

### Параметри

Пропсів, варіантів і розмірів немає, тому панель Controls порожня.

### Стани

| Стан | Текст | Кільце | Як перевірити |
| --- | --- | --- | --- |
| default | \`text-muted-on-dark\` | унизу, біля четвертої крапки | нічого не робити |
| hover | \`text-on-dark\` | піднімається до першої крапки | навести мишу |
| focus-visible | \`text-on-dark\`, навколо кнопки контур \`text-on-dark\` з відступом | піднімається до першої крапки | клацнути на порожньому місці прикладу й натиснути Tab |
| після кліку | залежить від того, чи є hover або фокус | близько 1,6 с лишається вгорі (враховуючи час на підйом), потім повертається; сторінка плавно прокручується вгору | клацнути |

Після кліку кільце не повертається вниз, доки на кнопці є hover або видимий фокус. На прикладі тут прокрутки не видно, бо сторінці нікуди прокручуватися.

Стану disabled немає. Перемикача станів у Controls немає: hover і focus-visible тут справжні.

**Зменшений рух** (\`prefers-reduced-motion\`): кільце змінює місце без переходу, сторінка переходить вгору без плавної прокрутки.

### Доступність

Це \`<button type="button">\` з \`aria-label="Back to top"\`. Колонка крапок прихована від читачів екрана (\`aria-hidden\`).

### Токени

- Кольори: \`canvas-dark\` (фон, його задає футер), \`text-muted-on-dark\`, \`text-on-dark\` (текст, кільце, контур фокуса), \`project-miri\`, \`project-rentflow\`, \`project-studio\`, \`project-sema\` (крапки).
- Текст: \`text-label\` і \`uppercase\`.
- Розміри: \`size-dot\`, \`size-ring\`. Радіус крапок і кільця: \`rounded-control\`.
- Рух: \`translate-y-ring-travel\`, \`ease-ring\`, тривалість \`duration-700\`.
- Відступи: \`gap-4\` (текст і крапки), \`gap-3\` (між крапками), \`p-1\` (колонка).

Проміжок \`gap-3\` входить у формулу \`spacing-ring-travel\`. Якщо змінюєте проміжок, змініть і токен.

### Контраст

| Пара | Контраст | Потрібно |
| --- | --- | --- |
| \`text-muted-on-dark\` на \`canvas-dark\` (текст у default) | 9.84 : 1 | 4.5 : 1 |
| \`text-on-dark\` на \`canvas-dark\` (текст на hover і focus) | 16.29 : 1 | 4.5 : 1 |
| контур фокуса \`text-on-dark\` на \`canvas-dark\` | 16.29 : 1 | 3 : 1 |

### Коли використовувати

Лише на темному фоні \`canvas-dark\`, один раз на сторінці, у футері. Не використовуйте на світлому фоні, на картках проєктів і як звичайну кнопку для інших дій.

### Як брати в код

\`\`\`tsx
import { BackToTop } from "@/components/BackToTop";

<footer className="bg-canvas-dark">
  <BackToTop />
</footer>
\`\`\`

Компонент уже клієнтський (\`"use client"\`), тому його можна вставити в серверний компонент.
`;

const meta = {
  title: "Components/BackToTop",
  component: BackToTop,
  tags: ["autodocs"],
  parameters: {
    controls: { disable: true },
    docs: { description: { component: description } },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center bg-canvas-dark p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
