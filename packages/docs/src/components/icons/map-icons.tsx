import React from 'react';
import * as IconPack from './index';

export interface GenericIconProps extends IconPack.IconProps {
  name: string;
}

const icons: { [key: string]: any } = {
  home: IconPack.Home,
  note: IconPack.Note,
  twitter: IconPack.Twitter,
  discord: IconPack.Discord,
  github: IconPack.Github,
  palette: IconPack.Palette,
  moon: IconPack.Moon,
  sun: IconPack.Sun,
  'arrow-left': IconPack.ArrowLeft,
  'arrow-right': IconPack.ArrowRight,
  'chevron-left': IconPack.ChevronLeft,
  'chevron-right': IconPack.ChevronRight
};

const Iconly: React.FC<GenericIconProps> = ({ name, ...props }) => {
  const Icon = icons[name];
  if (!Icon) {
    throw new Error(`Icon '${name}' doesn't exists in the icons folder`);
  }
  return <Icon {...props} />;
};

export default Iconly;
