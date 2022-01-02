import React from 'react';
import { Meta } from '@storybook/react';
import User from './index';

export default {
  title: 'Display/User',
  component: User
} as Meta;

const url = 'https://avatars.githubusercontent.com/u/30373425?v=4';

export const Default = () => <User squared src={url} name="Junior García" />;

export const Description = () => (
  <User squared src={url} name="Junior García">
    Software Developer
  </User>
);

export const Link = () => {
  return (
    <User squared src={url} name="Junior García">
      <User.Link href="https://twitter.com/jrgarciadev">@jrgarciadev</User.Link>
    </User>
  );
};
