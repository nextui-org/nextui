import React from "react";

import {
  MoonIcon,
  MagicIcon,
  FlashIcon,
  DevicesIcon,
  // Server,
  // TagUser,
  // RoundPointer,
  // Maximize,
  // CodeDocument,
  // HtmlLogo,
} from "@/components/icons";

export default {
  topFeatures: [
    {
      title: "Themeable",
      description:
        "Provides a plugin to customize default themes, you can change all semantic tokens or create an entire new theme.",
      icon: <MagicIcon className="text-pink-500" />,
    },
    {
      title: "Fast",
      description:
        "Built on top of Tailwind CSS, which means no runtime styles, and no unnecessary classes in your bundle.",
      icon: <FlashIcon className="text-pink-500" />,
    },
    {
      title: "Light & Dark UI",
      description:
        "Automatic dark mode recognition, NextUI automatically changes the theme when detects HTML theme prop changes.",
      icon: <MoonIcon className="text-pink-500" />,
    },
    {
      title: "Unique DX",
      description:
        "NextUI is fully-typed to minimize the learning curve, and provide the best possible developer experience.",
      icon: <DevicesIcon className="text-pink-500" />,
    },
  ],
  // fullFeatures: [
  //   {
  //     title: "Server side render (SSR)",
  //     description:
  //       "All NextUI components support cross-browser server-side rendering and provides a simple way to implement it in your project.",
  //     icon: <Server fill="#FF4ECD" />,
  //   },
  //   {
  //     title: "Accessible components",
  //     description:
  //       "NextUI components follow the WAI-ARIA guidelines, provide keyboard support and sensible focus management.",
  //     icon: <TagUser fill="#FF4ECD" />,
  //   },
  //   {
  //     title: "Focus interactions",
  //     description:
  //       "Focus ring will appear only when user navigates with keyboard or screen reader.",
  //     icon: <RoundPointer fill="#FF4ECD" />,
  //   },
  //   {
  //     title: "Built-in media queries",
  //     description:
  //       "NextUI provides a set of common media queries that, along with Stitches breakpoints allow you create responsive layouts faster.",
  //     icon: <Maximize fill="#FF4ECD" />,
  //   },
  //   {
  //     title: "TypeScript based",
  //     description:
  //       "Build type safe applications, NextUI has a fully-typed API to minimize the learning curve, and help you build applications.",
  //     icon: <CodeDocument fill="#FF4ECD" filled={false} />,
  //   },
  //   {
  //     title: "Override components tags",
  //     description: "A polymorphic `as` prop is included in all NextUI components.",
  //     icon: <HtmlLogo fill="#FF4ECD" />,
  //   },
  //   {
  //     title: "Critical Path CSS",
  //     description:
  //       "Since NextUI is based on Stitches, it only injects the styles which are actually used, so your users don't download unnecessary CSS.",
  //     icon: <Flash fill="#FF4ECD" />,
  //   },
  //   {
  //     title: "Beautifully designed",
  //     description:
  //       "NextUI components are unique and are not tied to any visual trend or design rule, which makes us unique and of course your projects as well.",
  //     icon: <Magic fill="#FF4ECD" />,
  //   },
  // ]
  themingCode: `const { nextui } = require("@nextui-org/react");

module.exports = {
  // ...
  plugins: [
    nextui({
      themes: {
        light: {
          primary: "#0072f5",
        },
        dark: {
          primary: "#0072f5",
        },
      },
    }),
  ],
};

module.exports = {
  // ...
  plugins: [
    nextui({
      themes: {
        light: {
          primary: "#7828c8",
        },
        dark: {
          primary: "#9353d3",
        },
      },
    }),
  ],
};

module.exports = {
  // ...
  plugins: [
    nextui({
      themes: {
        light: {
          primary: "#FFFFFF",
        },
        dark: {
          primary: "#000000",
        },
      },
    }),
  ],
};

module.exports = {
  // ...
  plugins: [
    nextui({
      themes: {
        light: {
          primary: "#FFD34E",
          secondary: "#EE457E",
          background:"#F4E8D1"
        },
        dark: {
          primary: "#FFD34E",
          secondary: "#EE457E",
          background: "#E1CA9E"
        },
      },
    }),
  ],
};
`,

  darkModeCode: `// 1. Import createTheme
import { createTheme, NextUIProvider } from "@nextui-org/react"

// 2. Call createTheme and pass your custom values
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {...},
  }
})

// 3. Apply dark theme
// Entry point of your app
const App = () => {
  return (
    <NextUIProvider theme={darkTheme}>
      <App />
    </NextUIProvider>
  )
}

export default App;
`,
};
