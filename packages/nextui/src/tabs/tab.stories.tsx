import TabList from './tablist';
import { Meta } from '@storybook/react';

export default {
  title: 'Layout/TabList'  
} as Meta;

export const TabListPreview = () => {
  return (<TabList buttons={[
    { text: 'Tab 1', onClick: () => {}, isActive: true },
    { text: 'Tab 2', onClick: () => {}, isActive: false },
    { text: 'Tab 3', onClick: () => {}, isActive: false },
  ]} />)
}