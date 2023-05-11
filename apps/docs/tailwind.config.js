const {nextui} = require("@nextui-org/theme/plugin");
const {commonColors} = require("@nextui-org/theme/colors");

// get tailwindcss default config
const defaultTheme = require("tailwindcss/defaultTheme");
const twColors = require("tailwindcss/colors.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/core/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "code-foreground": "#F4F4F4",
        "code-syntax1": "#ADD7FF",
        "code-syntax2": "#5DE4C7",
        "code-syntax3": "#c678dd",
        "code-syntax4": "#91B4D5",
        "code-syntax5": "#5DE4C7",
        "code-syntax6": "#91B4D5",
        "code-removed": commonColors.red[300],
        "code-string": "#5DE4C7",
        "code-class": "#91B4D5",
        "code-punctuation": commonColors.green[200],
        "code-number": "#91B4D5",
        "code-added": commonColors.green[300],
        "code-line-number": twColors.zinc[300],
        "code-faded-line": twColors.zinc[500],
        "code-comment": twColors.zinc[500],
        "code-keyword": "#c678dd",
        "code-function": "#ADD7FF",
        "code-tag": "#E06C75",
        "code-attr-name": "#91B4D5",
        "code-language-javascript": "#91B4D5",
        "code-highlighted-word1-bg": commonColors.purple[500],
        "code-highlighted-word1-bg-active": commonColors.purple[600],
        "code-highlighted-word1-text": commonColors.purple[800],
        "code-highlighted-word2-bg": commonColors.red[100],
        "code-highlighted-word2-bg-active": commonColors.red[500],
        "code-highlighted-word2-text": commonColors.red[200],
        "code-highlighted-word3-bg": commonColors.green[300],
        "code-highlighted-word3-bg-active": commonColors.green[300],
        "code-highlighted-word3-text": commonColors.green[100],
      },
      boxShadow: {
        highlighted: `${commonColors.purple[500]} 1px 0 0, ${commonColors.purple[500]} -1px 0 0`,
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        serif: defaultTheme.fontFamily.serif,
        mono: defaultTheme.fontFamily.mono,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: "hsl(var(--nextui-foreground))",
            maxWidth: "none",
            hr: {
              marginTop: "2em",
              marginBottom: "2em",
            },
            "h1, h2, h3": {
              letterSpacing: "-0.025em",
            },
            h2: {
              marginTop: "1.5em",
              marginBottom: `${16 / 24}em`,
            },
            h3: {
              marginTop: "1.8em",
              lineHeight: "1.4",
            },
            h4: {
              marginTop: "2em",
              fontSize: "1.125em",
            },
            "h2 a": {
              fontSize: `${theme("fontSize.2xl")[0]} !important`,
              ...theme("fontSize.2xl")[1],
            },
            "h3 a" :{
              fontWeight: theme("fontWeight.medium"),
            },
            "h2 small, h3 small, h4 small": {
              fontFamily: theme("fontFamily.mono").join(", "),
              color: theme("colors.slate.500"),
              fontWeight: 500,
            },
            "h2 small": {
              fontSize: theme("fontSize.lg")[0],
              ...theme("fontSize.lg")[1],
            },
            "h3 small": {
              fontSize: theme("fontSize.base")[0],
              ...theme("fontSize.base")[1],
            },
            "h4 small": {
              fontSize: theme("fontSize.sm")[0],
              ...theme("fontSize.sm")[1],
            },
            "h2, h3, h4": {
              "scroll-margin-top": "var(--scroll-mt)",
            },
            ul: {
              listStyleType: "none",
              paddingLeft: 0,
            },
            "ul > li": {
              marginTop: "0.1em",
              marginBottom: "0.1em",
              fontWeight: theme("fontWeight.light"),
            },
            "ul > li > *:last-child": {
              marginTop:0,
              marginBottom:0,
            },
            "ul > li > a": {
              marginTop: "0",
              marginBottom: "0",
            },
            a: {
              fontWeight: theme("fontWeight.normal"),
            },
            "a code": {
              color: "inherit",
              fontWeight: "inherit",
            },
            strong: {
              color: theme("colors.cyan.600"),
              fontWeight: theme("fontWeight.semibold"),
            },
            "a strong": {
              color: "inherit",
              fontWeight: "inherit",
            },
            kbd: {
              background: theme("colors.slate.100"),
              borderWidth: "1px",
              borderColor: theme("colors.slate.200"),
              padding: "0.125em 0.25em",
              color: theme("colors.slate.700"),
              fontWeight: 500,
              fontSize: "0.875em",
              fontVariantLigatures: "none",
              borderRadius: "4px",
              margin: "0 1px",
            },
            code: {
              fontWeight: theme("fontWeight.medium"),
              fontVariantLigatures: "none",
            },
            pre: {
              display: "flex",
              backgroundColor: "transparent",
              padding: 0,
              margin: 0,
            },
            p: {
              marginTop: `${12 / 14}em`,
              marginBottom: `${12 / 14}em`,
              fontWeight: theme("fontWeight.light"),
            },
            "pre code": {
              flex: "none",
              minWidth: "100%",
            },
            table: {
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("fontSize.sm")[1].lineHeight,
            },
            thead: {
              color: theme("colors.slate.700"),
              borderBottomColor: theme("colors.slate.200"),
            },
            "thead th": {
              paddingTop: 0,
              fontWeight: theme("fontWeight.semibold"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.slate.100"),
            },
            "tbody tr:last-child": {
              borderBottomWidth: "1px",
            },
            "tbody code": {
              fontSize: theme("fontSize.xs")[0],
            },
            "figure figcaption": {
              textAlign: "center",
              fontStyle: "italic",
            },
            "figure > figcaption": {
              marginTop: `${12 / 14}em`,
            },
            blockquote: {
              fontWeight: theme("fontWeight.light"),
              fontStyle: "font-normal",
            },
          },
        },
        dark: {
          css: {
            color: "hsl(var(--nextui-neutral-700))",
            strong: {
              color: theme("colors.pink.500"),
            },
          },
        },
        neutral: {
          css: {
            "--tw-prose-body": "hsl(var(--nextui-neutral-700))",
            "--tw-prose-headings": "hsl(var(--nextui-foreground))",
            "--tw-prose-lead": "hsl(var(--nextui-neutral-600))",
            "--tw-prose-links": "hsl(var(--nextui-neutral-900))",
            "--tw-prose-bold": "hsl(var(--nextui-neutral-900))",
            "--tw-prose-counters": "hsl(var(--nextui-neutral-500))",
            "--tw-prose-bullets": "hsl(var(--nextui-neutral-300))",
            "--tw-prose-hr": "hsl(var(--nextui-neutral-200))",
            "--tw-prose-quotes": "hsl(var(--nextui-neutral-900))",
            "--tw-prose-quote-borders": "hsl(var(--nextui-neutral-200))",
            "--tw-prose-captions": "hsl(var(--nextui-neutral-500))",
            "--tw-prose-code": "hsl(var(--nextui-neutral-900))",
            "--tw-prose-pre-code": "hsl(var(--nextui-neutral-200))",
            "--tw-prose-pre-bg": "hsl(var(--nextui-neutral-800))",
            "--tw-prose-th-borders": "hsl(var(--nextui-neutral-300))",
            "--tw-prose-td-borders": "hsl(var(--nextui-neutral-200))",
            "--tw-prose-invert-body": "hsl(var(--nextui-neutral-300))",
            "--tw-prose-invert-headings": commonColors.white,
            "--tw-prose-invert-lead": theme("twColors.neutral[400]"),
            "--tw-prose-invert-links": commonColors.white,
            "--tw-prose-invert-bold": commonColors.white,
            "--tw-prose-invert-counters": theme("twColors.neutral[400]"),
            "--tw-prose-invert-bullets": theme("twColors.neutral[600]"),
            "--tw-prose-invert-hr": theme("twColors.neutral[700]"),
            "--tw-prose-invert-quotes": theme("twColors.neutral[100]"),
            "--tw-prose-invert-quote-borders": theme("twColors.neutral[700]"),
            "--tw-prose-invert-captions": theme("twColors.neutral[400]"),
            "--tw-prose-invert-code": commonColors.white,
            "--tw-prose-invert-pre-code": "hsl(var(--nextui-neutral-300))",
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("twColors.neutral[600]"),
            "--tw-prose-invert-td-borders": theme("twColors.neutral[700]"),
          },
        },
      }),
    },
    keyframes: {
      heartbeat: {
        "0%": {transform: "scale(1)"},
        "50%": {transform: "scale(1.2)"},
        "100%": {transform: "scale(1)"},
      },
      levitate: {
        "0%": {
          transform: "translateY(0)",
        },
        "30%": {
          transform: "translateY(-10px)",
        },
        "50%": {
          transform: "translateY(4px)",
        },
        "70%": {
          transform: "translateY(-15px)",
        },
        "100%": {
          transform: "translateY(0)",
        },
      },
      expand: {
        "0%": {transform: "scale(1)"},
        "50%": {transform: "scale(1.2)"},
        "100%": {transform: "scale(1)"},
      },
      "expand-opacity": {
        "0%": {
          opacity: 0,
          transform: "scale(1)",
        },
        "50%": {
          opacity: 1,
          transform: "scale(1.3)",
        },
        "100%": {
          opacity: 0,
          transform: "scale(1.295)",
        },
      },
    },
    animation: {
      heartbeat: "heartbeat 1s ease-in-out infinite",
      levitate: "levitate 5s ease infinite",
      expand: "expand 6s ease-out infinite both",
      "expand-opacity": "expand-opacity 6s linear infinite both",
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          "code-background": "#363449",
          "code-mdx": "#ff4ecd",
        },
        dark: {
          "code-background": "#111111",
          "code-mdx": "#c678dd",
        },
      },
    }),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
