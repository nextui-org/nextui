import React from 'react';
import { Meta } from '@storybook/react';
import Avatar from './index';
import Spacer from '../spacer';
import { Lock, User, VolumeUp, Camera, Activity } from '../utils/icons';

export default {
  title: 'Display/Avatar',
  component: Avatar
} as Meta;

const nameUsers = ['Junior', 'Jane', 'W', 'John', 'JR'];
const pictureUsers = [
  'https://i.pravatar.cc/300?u=a042581f4e29026705d',
  'https://i.pravatar.cc/300?u=a042581f4e29026706d',
  'https://i.pravatar.cc/300?u=a042581f4e29026707d',
  'https://i.pravatar.cc/300?u=a042581f4e29026709d',
  'https://i.pravatar.cc/300?u=a042581f4f29026709d'
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({ children }: any) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: `${children.length * 45}px`
    }}
  >
    {children}
  </div>
);

export const Simple = () => <Avatar text="Hello" />;

export const Default = () => {
  return (
    <>
      <Avatar text={nameUsers[0]} />
      <Avatar pointer src={pictureUsers[1]} />
      <Avatar text={nameUsers[1]} />
      <Avatar src={pictureUsers[3]} squared />
      <Avatar text={nameUsers[3]} squared />
      <Avatar src={pictureUsers[4]} squared />
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Container>
        <Avatar color="primary" bordered pointer src={pictureUsers[0]} />
        <Avatar color="secondary" bordered pointer src={pictureUsers[1]} />
        <Avatar color="success" bordered src={pictureUsers[2]} squared />
        <Avatar color="warning" bordered src={pictureUsers[3]} squared />
        <Avatar color="error" bordered src={pictureUsers[4]} squared />
        <Avatar color="gradient" bordered src={pictureUsers[1]} squared />
        <Avatar
          bordered
          src={pictureUsers[2]}
          css={{ '.nextui-avatar-bg': { bg: '#ff4ecd' } }}
          squared
        />
      </Container>
      <Spacer y={2} />
      <Container>
        <Avatar text={nameUsers[0]} color="primary" pointer />
        <Avatar text={nameUsers[1]} color="secondary" pointer />
        <Avatar text={nameUsers[2]} color="success" squared />
        <Avatar text={nameUsers[3]} color="warning" squared />
        <Avatar text={nameUsers[0]} color="error" squared />
        <Avatar text={nameUsers[2]} color="gradient" squared />
      </Container>
    </>
  );
};

export const Bordered = () => {
  return (
    <Container>
      {pictureUsers.map((url, index) => (
        <Avatar
          key={index}
          squared={index % 2 > 0}
          bordered
          pointer
          src={url}
        />
      ))}
    </Container>
  );
};

export const BorderWeights = () => {
  return (
    <Container>
      <Avatar
        color="primary"
        borderWeight="light"
        bordered
        pointer
        src={pictureUsers[0]}
      />
      <Avatar
        borderWeight="normal"
        color="secondary"
        bordered
        pointer
        src={pictureUsers[1]}
      />
      <Avatar
        color="success"
        borderWeight="bold"
        bordered
        src={pictureUsers[2]}
        squared
      />
      <Avatar
        color="warning"
        bordered
        borderWeight="extrabold"
        src={pictureUsers[3]}
        squared
      />
      <Avatar
        color="error"
        borderWeight="black"
        bordered
        src={pictureUsers[4]}
        squared
      />
      <Avatar
        borderWeight="black"
        color="gradient"
        bordered
        src={pictureUsers[1]}
        squared
      />
    </Container>
  );
};

export const Sizes = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container>
        <Avatar src={pictureUsers[0]} size="xs" />
        <Avatar src={pictureUsers[1]} size="sm" />
        <Avatar src={pictureUsers[2]} size="md" />
        <Avatar src={pictureUsers[3]} size="lg" />
        <Avatar src={pictureUsers[4]} size="xl" />
      </Container>
      <Spacer />
      <Container>
        <Avatar squared text={nameUsers[4]} size="xs" />
        <Avatar squared text={nameUsers[1]} size="sm" />
        <Avatar squared text={nameUsers[2]} size="md" />
        <Avatar squared text={nameUsers[3]} size="lg" />
        <Avatar squared text={nameUsers[0]} size="xl" />
      </Container>
    </div>
  );
};

export const Zoomed = () => {
  return (
    <Container>
      {pictureUsers.map((url, index) => (
        <Avatar key={index} size="md" zoomed bordered pointer src={url} />
      ))}
    </Container>
  );
};

export const Icons = () => {
  return (
    <Container>
      <Avatar squared icon={<Lock size={20} fill="currentColor" />} />
      <Avatar squared icon={<Camera size={20} fill="currentColor" />} />
      <Avatar squared icon={<User size={20} fill="currentColor" />} />
      <Avatar squared icon={<VolumeUp size={20} fill="currentColor" />} />
      <Avatar squared icon={<Activity size={20} fill="currentColor" />} />
    </Container>
  );
};

export const Group = () => {
  return (
    <Container>
      <Avatar.Group count={12}>
        {pictureUsers.map((url, index) => (
          <Avatar key={index} src={url} bordered stacked />
        ))}
      </Avatar.Group>
      <Spacer y={2} />
      <Avatar.Group count={12}>
        {nameUsers.map((name, index) => (
          <Avatar key={index} text={name} bordered stacked />
        ))}
      </Avatar.Group>
      <Spacer y={2} />
      <Avatar.Group>
        <Avatar text="1" />
        <Avatar text="2" />
      </Avatar.Group>
    </Container>
  );
};
