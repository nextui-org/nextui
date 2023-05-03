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

  darkModeCode: `import React from "react";
import {NextUIProvider} from "@nextui-org/react";

const Application = ({Component, pageProps}) => {
  return (
    <NextUIProvider>
      <main className={isDark ? "dark" : "light"}>
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  );
};

export default Application;  
`,
  customizationCode: `import React from 'react';
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';

const CustomButton = () => {
  const handleConfetti = () => {
    confetti({...});
  };

  return (
    <Button
      ref={buttonRef}
      disableRipple
      className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
      size="lg"
      onPress={handleConfetti}
    >
      Press me
    </Button>
  );
};

export default CustomButton;
`,
};
