import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: "#f3f3f3",
        myblue: "#3e7ff7",
        textcolor: '#635e5ef2',
        doneText: '#635e5e98',
      },
    },
  },
  plugins: [],
};
export default config;
