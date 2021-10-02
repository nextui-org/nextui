import React from 'react';
import { Meta } from '@storybook/react';
import Link from './link';
import { Spacer, Text } from '../index';

export default {
  title: 'Navigation/Link',
  component: Link,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const text = `"First solve the problem. Then, write the code." - Jon Johnson.`;

export const Default = () => <Link href="#">{text}</Link>;

export const Highlight = () => (
  <Link href="#" color>
    {text}
  </Link>
);

export const Variants = () => (
  <>
    <Text>
      <Link href="#">{text}</Link>
    </Text>
    <Text>
      <Link href="#" color>
        {text}
      </Link>
    </Text>
    <Text>
      <Link href="#" underline>
        {text}
      </Link>
    </Text>
    <Text>
      <Link href="#" color underline>
        {text}
      </Link>
    </Text>
  </>
);

export const Icon = () => (
  <>
    <Link href="#" icon>
      {text}
    </Link>
    <Spacer y={0.5} />
    <Link href="#" icon color>
      {text}
    </Link>
  </>
);

export const Block = () => (
  <Link href="#" block>
    {text}
  </Link>
);
