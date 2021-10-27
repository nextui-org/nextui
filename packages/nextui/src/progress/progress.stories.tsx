import React from 'react';
import { Meta } from '@storybook/react';
import ProgressBar from './index';
import { Spacer } from '../index';

export default {
  title: 'General/Progress',
  component: ProgressBar
} as Meta;

export const Default = () => {
  return <ProgressBar value={50} />;
};

export const Colors = () => (
  <>
    <ProgressBar value={50} color="primary" />
    <Spacer y={0.5} />
    <ProgressBar value={30} color="secondary" />
    <Spacer y={0.5} />
    <ProgressBar value={70} color="success" />
    <Spacer y={0.5} />
    <ProgressBar value={150} color="warning" />
    <Spacer y={0.5} />
    <ProgressBar value={10} color="error" />
    <Spacer y={0.5} />
    <ProgressBar value={20} color="gradient" />
    <Spacer y={0.5} />
    <ProgressBar value={45} color="#f4a" />
  </>
);

export const Striped = () => {
  return (
    <>
      <ProgressBar striped value={200} max={250} />
      <Spacer y={0.5} />
      <ProgressBar striped value={45} />
      <Spacer y={0.5} />
      <ProgressBar striped value={29} />
    </>
  );
};

export const Squared = () => {
  return (
    <>
      <ProgressBar squared value={200} max={250} />
      <Spacer y={0.5} />
      <ProgressBar squared value={45} />
      <Spacer y={0.5} />
      <ProgressBar squared value={29} />
    </>
  );
};

export const NoAnimated = () => {
  return (
    <>
      <ProgressBar animated={false} value={200} max={250} />
      <Spacer y={0.5} />
      <ProgressBar animated={false} value={45} />
      <Spacer y={0.5} />
      <ProgressBar animated={false} value={29} />
    </>
  );
};
