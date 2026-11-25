import { Archivo } from "next/font/google";

// Archivo не має кириличного піднабору в Google Fonts (є latin, latin-ext, vietnamese),
// тому 'cyrillic' тут вказати не можна: збірка впаде. Кирилиця піде на запасний шрифт Arial.
// Archivo змінний, тому ваги 200, 300, 400, 700 беруться з одного файлу.
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"], // курсив 200 лише для слова «AI-assisted»
  variable: "--font-archivo",
  display: "swap",
});
