import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Storybook лежить у public/storybook. Next.js не відкриває index.html у теці
  // сам, тому /storybook/ ведемо прямо на файл. Саме переадресація, а не rewrite:
  // Storybook шукає свої файли відносно адреси, і їй потрібне /storybook/ на початку.
  async redirects() {
    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html",
        permanent: false,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
