import React from "react";
import {Code} from "@nextui-org/react";

import {
  MoonIcon,
  MagicIcon,
  FlashIcon,
  DevicesIcon,
  ServerLinearIcon,
  TagUserLinearIcon,
  MouseCircleLinearIcon,
  CodeDocumentLinearIcon,
  HtmlLogoLinearIcon,
  CubesLinearIcon,
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
  fullFeatures: [
    {
      title: "React server components",
      description: (
        <>
          All NextUI components already include the <Code>&quot;use client&quot;</Code> directive,
          which means you can import and use them directly in your RSC.
        </>
      ),
      icon: <ServerLinearIcon className="text-pink-500" />,
    },
    {
      title: "Accessible components",
      description:
        "NextUI components follow the WAI-ARIA guidelines, provide keyboard support and sensible focus management.",
      icon: <TagUserLinearIcon className="text-pink-500" />,
    },
    {
      title: "Focus interactions",
      description:
        "Focus ring will appear only when user navigates with keyboard or screen reader.",
      icon: <MouseCircleLinearIcon className="text-pink-500" />,
    },
    {
      title: "Multiple packages",
      description:
        "NextUI is divided into multiple packages, so you can install only the components you need.",
      icon: <CubesLinearIcon className="text-pink-500" />,
    },
    {
      title: "TypeScript based",
      description:
        "Build type safe applications, NextUI has a fully-typed API to minimize the learning curve, and help you build applications.",
      icon: <CodeDocumentLinearIcon className="text-pink-500" />,
    },
    {
      title: "Override components tags",
      description: "A polymorphic `as` prop is included in all NextUI components.",
      icon: <HtmlLogoLinearIcon className="text-pink-500" />,
    },
    {
      title: "No runtime styles",
      description:
        "NextUI is based on Tailwind CSS, it means that there are no runtime styles, and no unnecessary classes in your bundle.",
      icon: <FlashIcon className="text-pink-500" />,
    },
    {
      title: "Beautifully designed",
      description:
        "NextUI components are unique and are not tied to any visual trend or design rule, which makes us unique and of course your projects as well.",
      icon: <MagicIcon className="text-pink-500" />,
    },
  ],
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
