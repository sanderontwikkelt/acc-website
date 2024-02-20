import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@acme/tailwind-config";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  darkMode: ["class"],
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        main: "rgb(var(--color-main) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        description: "rgb(var(--color-description) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
        primary: ["var(--font-primary)", ...fontFamily.sans],
        secondary: ["var(--font-secondary)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        fadeIn: "fadeIn 1s forwards",
        zoomIn: "zoomIn 1s forwards",
        draw: "draw 5s forwards",
        moveLeft: "moveLeft 15s linear infinite",
        moveUp: "moveUp 0.5s ease-in forwards",
        moveToRight: "moveToRight 1.25s forwards",
        moveToDown: "moveToDown 1.25s forwards",
      },
      keyframes: {
        moveLeft: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-100vw)",
          },
        },
        moveToRight: {
          from: {
            opacity: "0",
            transform: "translateX(-100%)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        moveToDown: {
          from: {
            opacity: "0",
            transform: "translateY(-100%)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        moveUp: {
          from: {
            transform: "translateX(-50px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
        fadeIn: {
          to: {
            opacity: "1",
          },
        },
        zoomIn: {
          to: {
            transform: "scale(1)",
          },
        },
        draw: {
          to: {
            strokeDashoffset: "0",
          },
        },
      },
    },
  },
} satisfies Config;
