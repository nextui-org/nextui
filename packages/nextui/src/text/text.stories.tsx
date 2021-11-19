import React from 'react';
import { Meta } from '@storybook/react';
import Text from './text';

export default {
  title: 'General/Typography',
  component: Text,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '50%' }}>
        <Story />
      </div>
    )
  ]
} as Meta;

const shortText = 'Almost before we knew it, we had left the ground.';
const largeText =
  'NextUI gives you the best developer experience with all the features you need for building beautiful and modern websites and applications.';

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
    <Text style={{ color: '#ccc' }}>{shortText}</Text>
  </>
);

export const Small = () => (
  <Text>
    <Text small>{largeText}</Text>
    <Text small i>
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
    <Text size={12}>Font Size: 12px;</Text>
    <Text size={14}>Font Size: 14px;</Text>
    <Text size="100%">Font Size: 100%;</Text>
    <Text size="1.25rem">Font Size: 1.25rem;</Text>
    <Text size="2em">Font Size: 2em;</Text>
  </>
);

export const Composed = () => (
  <>
    <Text weight={100}>{largeText}</Text>
    <Text>
      <Text small del>
        {shortText}
      </Text>
      <Text small b>
        {shortText}
      </Text>
    </Text>
  </>
);
