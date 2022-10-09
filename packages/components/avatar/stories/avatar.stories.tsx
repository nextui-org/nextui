import React from "react";
import {Meta} from "@storybook/react";
import {Spacer} from "@nextui-org/spacer";
import {Lock, User, VolumeUp, Camera, Activity} from "@nextui-org/shared-icons";

import {Avatar} from "../src";

export default {
  title: "Display/Avatar",
  component: Avatar,
} as Meta;

const nameUsers = ["Junior", "Jane", "W", "John", "JR"];
const pictureUsers = [
  "https://i.pravatar.cc/300?u=a042581f4e29026705d",
  "https://i.pravatar.cc/300?u=a042581f4e29026706d",
  "https://i.pravatar.cc/300?u=a042581f4e29026707d",
  "https://i.pravatar.cc/300?u=a042581f4e29026709d",
  "https://i.pravatar.cc/300?u=a042581f4f29026709d",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = ({children}: any) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      width: "100%",
      maxWidth: `${children.length * 45}px`,
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
      <Avatar squared src={pictureUsers[3]} />
      <Avatar squared text={nameUsers[3]} />
      <Avatar squared src={pictureUsers[4]} />
    </>
  );
};

export const Colors = () => {
  return (
    <>
      <Container>
        <Avatar bordered pointer color="primary" src={pictureUsers[0]} />
        <Avatar bordered pointer color="secondary" src={pictureUsers[1]} />
        <Avatar bordered squared color="success" src={pictureUsers[2]} />
        <Avatar bordered squared color="warning" src={pictureUsers[3]} />
        <Avatar bordered squared color="error" src={pictureUsers[4]} />
        <Avatar bordered squared color="gradient" src={pictureUsers[1]} />
        <Avatar
          bordered
          squared
          css={{".nextui-avatar-bg": {bg: "#ff4ecd"}}}
          src={pictureUsers[2]}
        />
      </Container>
      <Spacer y={2} />
      <Container>
        <Avatar pointer color="primary" text={nameUsers[0]} />
        <Avatar pointer color="secondary" text={nameUsers[1]} />
        <Avatar squared color="success" text={nameUsers[2]} />
        <Avatar squared color="warning" text={nameUsers[3]} />
        <Avatar squared color="error" text={nameUsers[0]} />
        <Avatar squared color="gradient" text={nameUsers[2]} />
      </Container>
    </>
  );
};

export const Bordered = () => {
  return (
    <Container>
      {pictureUsers.map((url, index) => (
        <Avatar key={index} bordered pointer squared={index % 2 > 0} src={url} />
      ))}
    </Container>
  );
};

export const BorderWeights = () => {
  return (
    <Container>
      <Avatar bordered pointer borderWeight="light" color="primary" src={pictureUsers[0]} />
      <Avatar bordered pointer borderWeight="normal" color="secondary" src={pictureUsers[1]} />
      <Avatar bordered squared borderWeight="bold" color="success" src={pictureUsers[2]} />
      <Avatar bordered squared borderWeight="extrabold" color="warning" src={pictureUsers[3]} />
      <Avatar bordered squared borderWeight="black" color="error" src={pictureUsers[4]} />
      <Avatar bordered squared borderWeight="black" color="gradient" src={pictureUsers[1]} />
    </Container>
  );
};

export const Sizes = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container>
        <Avatar size="xs" src={pictureUsers[0]} />
        <Avatar size="sm" src={pictureUsers[1]} />
        <Avatar size="md" src={pictureUsers[2]} />
        <Avatar size="lg" src={pictureUsers[3]} />
        <Avatar size="xl" src={pictureUsers[4]} />
      </Container>
      <Spacer />
      <Container>
        <Avatar squared size="xs" text={nameUsers[4]} />
        <Avatar squared size="sm" text={nameUsers[1]} />
        <Avatar squared size="md" text={nameUsers[2]} />
        <Avatar squared size="lg" text={nameUsers[3]} />
        <Avatar squared size="xl" text={nameUsers[0]} />
      </Container>
    </div>
  );
};

export const Zoomed = () => {
  return (
    <Container>
      {pictureUsers.map((url, index) => (
        <Avatar key={index} bordered pointer zoomed size="md" src={url} />
      ))}
    </Container>
  );
};

export const Icons = () => {
  return (
    <Container>
      <Avatar squared icon={<Lock fill="currentColor" size={20} />} />
      <Avatar squared icon={<Camera fill="currentColor" size={20} />} />
      <Avatar squared icon={<User fill="currentColor" size={20} />} />
      <Avatar squared icon={<VolumeUp fill="currentColor" size={20} />} />
      <Avatar squared icon={<Activity fill="currentColor" size={20} />} />
    </Container>
  );
};

export const Group = () => {
  return (
    <Container>
      <Avatar.Group count={12}>
        {pictureUsers.map((url, index) => (
          <Avatar key={index} bordered stacked src={url} />
        ))}
      </Avatar.Group>
      <Spacer y={2} />
      <Avatar.Group count={12}>
        {nameUsers.map((name, index) => (
          <Avatar key={index} bordered stacked text={name} />
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
