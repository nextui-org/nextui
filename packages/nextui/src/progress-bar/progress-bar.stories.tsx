import React from 'react';
import ProgressBar from './index';
import { Meta } from '@storybook/react';
import { Spacer } from '../index';

export default {
  title: 'General/ProgressBar',
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

export const Bordered = () => {
  return (
    <>
      <ProgressBar bordered={true} borderWeight="light" value={200} max={250} />
      <Spacer y={0.5} />
      <ProgressBar bordered={true} borderWeight="normal" value={45} />
      <Spacer y={0.5} />
      <ProgressBar bordered={true} borderWeight="bold" value={29} />
    </>
  );
};
