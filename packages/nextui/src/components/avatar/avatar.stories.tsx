import React from 'react';
import { Meta } from '@storybook/react';
import Avatar from './index';
import useTheme from '@hooks/use-theme';
import { Spacer } from '@components';
import { Lock, User, VolumeUp, Camera, Activity } from '@utils/icons';

export default {
  title: 'Display/Avatar',
  component: Avatar,
} as Meta;

const nameUsers = ['Junior', 'Jane', 'W', 'John'];
const pictureUsers = [
  'https://i.pravatar.cc/300?u=a042581f4e29026705d',
  'https://i.pravatar.cc/300?u=a042581f4e29026706d',
  'https://i.pravatar.cc/300?u=a042581f4e29026707d',
  'https://i.pravatar.cc/300?u=a042581f4e29026709d',
  'https://i.pravatar.cc/300?u=a042581f4f29026709d',
];

export const Default = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '50%',
        flexWrap: 'wrap',
      }}
    >
      <Avatar text={nameUsers[0]} />
      <Avatar pointer src={pictureUsers[1]} />
      <Avatar text={nameUsers[1]} />
      <Avatar pointer src={pictureUsers[2]} />
      <Avatar text={nameUsers[2]} squared />
      <Avatar src={pictureUsers[3]} squared />
      <Avatar text={nameUsers[3]} squared />
      <Avatar src={pictureUsers[4]} squared />
    </div>
  );
};

export const Colors = () => {
  const url = 'https://i.pravatar.cc/300?u=a042581f4e29026704d';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '50%',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          maxWidth: '100%',
        }}
      >
        <Avatar
          size="large"
          color="primary"
          bordered
          pointer
          src={pictureUsers[0]}
        />
        <Avatar
          size="large"
          color="secondary"
          bordered
          pointer
          src={pictureUsers[1]}
        />
        <Avatar
          size="large"
          color="success"
          bordered
          src={pictureUsers[2]}
          squared
        />
        <Avatar
          size="large"
          color="warning"
          bordered
          src={pictureUsers[3]}
          squared
        />
        <Avatar
          size="large"
          color="error"
          bordered
          src={pictureUsers[4]}
          squared
        />
        <Avatar
          size="large"
          color="gradient"
          bordered
          src={pictureUsers[1]}
          squared
        />
      </div>
      <Spacer />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          maxWidth: '100%',
        }}
      >
        <Avatar size="large" text={nameUsers[0]} color="primary" pointer />
        <Avatar size="large" text={nameUsers[1]} color="secondary" pointer />
        <Avatar size="large" text={nameUsers[2]} color="success" squared />
        <Avatar size="large" text={nameUsers[3]} color="warning" squared />
        <Avatar size="large" text={nameUsers[0]} color="error" squared />
        <Avatar size="large" text={nameUsers[2]} color="gradient" squared />
      </div>
    </div>
  );
};

export const Bordered = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '50%',
        flexWrap: 'wrap',
      }}
    >
      {pictureUsers.map((url, index) => (
        <Avatar
          key={index}
          squared={index % 2 > 0}
          size="medium"
          bordered
          pointer
          src={url}
        />
      ))}
    </div>
  );
};

export const Sizes = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '50%',
        flexWrap: 'wrap',
      }}
    >
      <Avatar src={pictureUsers[0]} size="mini" />
      <Avatar pointer squared src={pictureUsers[1]} size="small" />
      <Avatar src={pictureUsers[2]} size="medium" />
      <Avatar pointer squared src={pictureUsers[3]} size="large" />
      <Avatar src={pictureUsers[4]} size="xlarge" />
    </div>
  );
};

export const Zoomed = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '50%',
        flexWrap: 'wrap',
      }}
    >
      {pictureUsers.map((url, index) => (
        <Avatar key={index} size="medium" zoomed bordered pointer src={url} />
      ))}
    </div>
  );
};

export const Icons = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '50%',
        flexWrap: 'wrap',
      }}
    >
      <Avatar
        size="large"
        squared
        icon={<Lock theme={theme} fill={theme.palette.text} />}
      />
      <Avatar
        size="large"
        squared
        icon={<Camera theme={theme} fill={theme.palette.text} />}
      />
      <Avatar
        size="large"
        squared
        icon={<User theme={theme} fill={theme.palette.text} />}
      />
      <Avatar
        size="large"
        squared
        icon={<VolumeUp theme={theme} fill={theme.palette.text} />}
      />
      <Avatar
        size="large"
        squared
        icon={<Activity theme={theme} fill={theme.palette.text} />}
      />
    </div>
  );
};

export const Group = () => {
  return (
    <>
      <Avatar.Group count={12}>
        {pictureUsers.map((url, index) => (
          <Avatar key={index} src={url} bordered stacked />
        ))}
      </Avatar.Group>
      <Spacer />
      <Avatar.Group count={12}>
        {nameUsers.map((name, index) => (
          <Avatar key={index} text={name} bordered stacked />
        ))}
      </Avatar.Group>
    </>
  );
};
