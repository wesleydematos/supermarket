/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1300px",
  },
  theme: {
    extend: {
      colors: {
        header: "#1E2044",
        primary: "#060937",
        secondary: "#0DAB77",
        tertiary: "#00B780",
        error: "#f44336",
        sucess: "#4caf50",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
