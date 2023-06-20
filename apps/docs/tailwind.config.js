const {nextui} = require("@nextui-org/theme/plugin");
const {commonColors} = require("@nextui-org/theme/colors");
const svgToDataUri = require('mini-svg-data-uri')
const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

// get tailwindcss default config
const defaultTheme = require("tailwindcss/defaultTheme");
const twColors = require("tailwindcss/colors.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./libs/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "code-foreground": 'rgb(var(--code-foreground) / <alpha-value>)',
        "code-syntax1": 'rgb(var(--code-syntax1) / <alpha-value>)',
        "code-syntax2": 'rgb(var(--code-syntax2) / <alpha-value>)',
        "code-syntax3": 'rgb(var(--code-syntax3) / <alpha-value>)',
        "code-syntax4": 'rgb(var(--code-syntax4) / <alpha-value>)',
        "code-syntax5": 'rgb(var(--code-syntax5) / <alpha-value>)',
        "code-syntax6": 'rgb(var(--code-syntax6) / <alpha-value>)',
        "code-removed": 'rgb(var(--code-removed) / <alpha-value>)',
        "code-string": 'rgb(var(--code-string) / <alpha-value>)',
        "code-class": 'rgb(var(--code-class) / <alpha-value>)',
        "code-punctuation": 'rgb(var(--code-punctuation) / <alpha-value>)',
        "code-number": 'rgb(var(--code-number) / <alpha-value>)',
        "code-added": 'rgb(var(--code-added) / <alpha-value>)',
        "code-line-number": 'rgb(var(--code-line-number) / <alpha-value>)',
        "code-faded-line": 'rgb(var(--code-faded-line) / <alpha-value>)',
        "code-comment": 'rgb(var(--code-comment) / <alpha-value>)',
        "code-keyword": 'rgb(var(--code-keyword) / <alpha-value>)',
        "code-function": 'rgb(var(--code-function) / <alpha-value>)',
        "code-tag": 'rgb(var(--code-tag) / <alpha-value>)',
        "code-attr-name": 'rgb(var(--code-attr-name) / <alpha-value>)',
        "code-language-javascript": 'rgb(var(--code-language-javascript) / <alpha-value>)',
        "code-highlighted-word1-bg": 'rgb(var(--code-highlighted-word1-bg) / <alpha-value>)',
        "code-highlighted-word1-bg-active": 'rgb(var(--code-highlighted-word1-bg-active) / <alpha-value>)',
        "code-highlighted-word1-text": 'rgb(var(--code-highlighted-word1-text) / <alpha-value>)',
        "code-highlighted-word2-bg": 'rgb(var(--code-highlighted-word2-bg) / <alpha-value>)',
        "code-highlighted-word2-bg-active": 'rgb(var(--code-highlighted-word2-bg-active) / <alpha-value>)',
        "code-highlighted-word2-text": 'rgb(var(--code-highlighted-word2-text) / <alpha-value>)',
        "code-highlighted-word3-bg": 'rgb(var(--code-highlighted-word3-bg) / <alpha-value>)',
        "code-highlighted-word3-bg-active": 'rgb(var(--code-highlighted-word3-bg-active) / <alpha-value>)',
        "code-highlighted-word3-text": 'rgb(var(--code-highlighted-word3-text) / <alpha-value>)',
      },
      boxShadow: {
        highlighted: `${commonColors.purple[500]} 1px 0 0, ${commonColors.purple[500]} -1px 0 0`,
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
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
              fontSize: '1.25rem !important',
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
              fontWeight: theme("fontWeight.noemal"),
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
              fontSize: theme("fontSize.sm")[0],
              backgroundColor: "transparent",
              fontWeight: theme("fontWeight.light"),
              padding: 0,
              margin: 0,
            },
            p: {
              marginTop: `${12 / 14}em`,
              marginBottom: `${12 / 14}em`,
              fontWeight: theme("fontWeight.normal"),
            },
            "pre code": {
              flex: "none",
              minWidth: "100%",
            },
            table: {
              marginTop: '0px',
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("fontSize.sm")[1].lineHeight,
            },
            thead: {
              border: 'none',
            },
            "thead th": {
              paddingTop: 0,
              fontWeight: theme("fontWeight.semibold"),
            },
            "tbody tr": {
              border: 'none',
            },
            "tbody tr:last-child": {
              border: 'none',
            },
            "figure figcaption": {
              textAlign: "center",
              fontStyle: "italic",
            },
            "figure > figcaption": {
              marginTop: `${12 / 14}em`,
            },
            blockquote: {
              fontWeight: theme("fontWeight.normal"),
              fontStyle: "font-normal",
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
          },
        },
        dark: {
          css: {
            color: "hsl(var(--nextui-default-700))",
            strong: {
              color: theme("colors.pink.500"),
            },
          },
        },
        neutral: {
          css: {
            "--tw-prose-body": "hsl(var(--nextui-default-700))",
            "--tw-prose-headings": "hsl(var(--nextui-foreground))",
            "--tw-prose-lead": "hsl(var(--nextui-default-600))",
            "--tw-prose-links": "hsl(var(--nextui-default-900))",
            "--tw-prose-bold": "hsl(var(--nextui-default-900))",
            "--tw-prose-counters": "hsl(var(--nextui-default-500))",
            "--tw-prose-bullets": "hsl(var(--nextui-default-300))",
            "--tw-prose-hr": "hsl(var(--nextui-default-200))",
            "--tw-prose-quotes": "hsl(var(--nextui-default-900))",
            "--tw-prose-quote-borders": "hsl(var(--nextui-default-200))",
            "--tw-prose-captions": "hsl(var(--nextui-default-500))",
            "--tw-prose-code": "hsl(var(--nextui-default-900))",
            "--tw-prose-pre-code": "hsl(var(--nextui-default-200))",
            "--tw-prose-pre-bg": "hsl(var(--nextui-default-800))",
            "--tw-prose-th-borders": "hsl(var(--nextui-default-300))",
            "--tw-prose-td-borders": "hsl(var(--nextui-default-200))",
            "--tw-prose-invert-body": "hsl(var(--nextui-default-300))",
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
            "--tw-prose-invert-pre-code": "hsl(var(--nextui-default-300))",
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("twColors.neutral[600]"),
            "--tw-prose-invert-td-borders": theme("twColors.neutral[700]"),
          },
        },
      }),
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
   
  },
  plugins: [
    nextui({
      themes: {
        light: {
          "code-background": "#363449",
          "code-mdx": "#ff4ecd",
        },
        dark: {
          "code-background": "#0D0B0B",
          "code-mdx": "#06B7DB",
        },
      },
    }),
    require("@tailwindcss/typography"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    }),
  ],
};
