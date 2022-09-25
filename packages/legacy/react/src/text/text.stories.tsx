import React from "react";
import {Meta} from "@storybook/react";

import Text from "./text";

export default {
  title: "General/Typography",
  component: Text,
  decorators: [
    (Story) => (
      <div style={{maxWidth: "50%"}}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const shortText = "Almost before we knew it, we had left the ground.";
const largeText =
  "NextUI gives you the best developer experience with all the features you need for building beautiful and modern websites and applications.";

export const Headings = () => {
  return (
    <>
      <Text h1>{shortText}</Text>
      <Text h2>{shortText}</Text>
      <Text h3>{shortText}</Text>
      <Text h4>{shortText}</Text>
      <Text h5>{shortText}</Text>
      <Text h6>{shortText}</Text>
    </>
  );
};

export const Gradient = () => (
  <>
    <Text
      h1
      css={{
        textGradient: "45deg, $blue600 0%, $cyan600 100%",
      }}
      weight="bold"
    >
      Let&apos;s
    </Text>
    <Text
      h1
      css={{
        textGradient: "45deg, $pink600 0%, $red600 100%",
      }}
      weight="bold"
    >
      Make the web
    </Text>
    <Text
      h1
      css={{
        textGradient: "45deg, $yellow600 0%, $red600 100%",
      }}
      weight="bold"
    >
      Prettier
    </Text>
  </>
);

export const Paragraph = () => (
  <>
    <Text>{largeText}</Text>
    <Text b>{largeText}</Text>
  </>
);

export const Colors = () => (
  <>
    <Text color="default">{shortText}</Text>
    <Text color="primary">{shortText}</Text>
    <Text color="secondary">{shortText}</Text>
    <Text color="success">{shortText}</Text>
    <Text color="warning">{shortText}</Text>
    <Text color="error">{shortText}</Text>
    <Text color="#ccc">{shortText}</Text>
  </>
);

export const Small = () => (
  <Text>
    <Text small>{largeText}</Text>
    <Text i small>
      {largeText}
    </Text>
  </Text>
);

export const Blockquote = () => (
  <>
    <Text blockquote>{shortText}</Text>
  </>
);

export const Sizes = () => (
  <>
    <Text size="$xs">Font Size: xs;</Text>
    <Text size="$md">Font Size: md (base);</Text>
    <Text size="$xl">Font Size: xl;</Text>
    <Text size="$2xl">Font Size: 2xl;</Text>
    <Text size="$3xl">Font Size: 3xl;</Text>
  </>
);

export const Composed = () => (
  <>
    <Text weight="hairline">{largeText}</Text>
    <Text>
      <Text del small>
        {shortText}
      </Text>
      <Text b small>
        {shortText}
      </Text>
    </Text>
  </>
);
