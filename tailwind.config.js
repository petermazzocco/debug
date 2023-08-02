/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        thread: {
          primary: "#131513",

          secondary: "#FBFFF1",

          accent: "#8AB0AB",

          neutral: "#192124",

          base: "#FEFCFB",

          info: "#4F7CAC",

          success: "#2BA84A",

          warning: "#ED9B40",

          error: "#EC4E20",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
