import React from 'react';
import { Meta } from '@storybook/react';
import Switch from './index';
import { Moon, Sun, Lock, Notification } from '../utils/icons';

export default {
  title: 'Inputs/Switch',
  component: Switch,
  onChange: { action: 'changed' }
} as Meta;

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Switch />
    <br />
    <Switch initialChecked />
  </div>
);

export const Colors = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Switch color="primary" checked={true}>
      Primary
    </Switch>
    <br />
    <Switch color="secondary" checked={true}>
      Secondary
    </Switch>
    <br />
    <Switch color="success" checked={true}>
      Success
    </Switch>
    <br />
    <Switch color="warning" checked={true}>
      Warning
    </Switch>
    <br />
    <Switch color="error" checked={true}>
      Error
    </Switch>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Switch initialChecked size="xs" />
    <br />
    <Switch size="sm" />
    <br />
    <Switch initialChecked size="md" />
    <br />
    <Switch size="lg" />
    <br />
    <Switch initialChecked size="xl" />
  </div>
);

export const Squared = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Switch squared color="primary" checked={true}>
      Primary
    </Switch>
    <br />
    <Switch squared color="secondary" checked={true}>
      Secondary
    </Switch>
    <br />
    <Switch squared color="success" checked={true}>
      Success
    </Switch>
    <br />
    <Switch squared color="warning" checked={true}>
      Warning
    </Switch>
    <br />
    <Switch squared color="error" checked={true}>
      Error
    </Switch>
  </div>
);

export const Disabled = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Switch disabled />
    <br />
    <Switch initialChecked disabled />
  </div>
);

export const Icons = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Switch size="xl" icon={<Lock />} />
      <Switch size="xl" icon={<Notification />} />
      <Switch size="xl" iconOn={<Sun />} iconOff={<Moon />} />
    </div>
  );
};
