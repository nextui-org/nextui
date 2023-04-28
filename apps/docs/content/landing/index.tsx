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
        "Provides a simple way to customize default themes, you can change the colors, fonts, breakpoints and everything you need.",
      icon: <MagicIcon className="text-pink-500" />,
    },
    {
      title: "Fast",
      description:
        "Avoids unnecessary styles props at runtime, making it more performant than other UI libraries.",
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
};
