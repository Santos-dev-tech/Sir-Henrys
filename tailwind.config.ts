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
        offwhite: "#F7F1E6",
        primary: "#221D18",
        navy: "#1B2A4A",
        accent: "#5C1A22",
        brass: "#B08D57",
        hairline: "#D4C9B8",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        ui: ['"Cormorant"', "Georgia", "serif"],
        body: ['"EB Garamond"', "Georgia", "serif"],
      },
      borderRadius: {
        none: "0",
        DEFAULT: "0",
      },
      spacing: {
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
      },
    },
  },
  plugins: [],
};

export default config;
