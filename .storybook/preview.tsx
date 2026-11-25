import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import { archivo } from "../app/fonts";

// На сайті клас зі змінною шрифту стоїть на <html> у layout.
// Storybook layout не бачить, тому ставимо той самий клас тут.
document.documentElement.classList.add(archivo.variable);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
