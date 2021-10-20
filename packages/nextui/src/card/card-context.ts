import React from 'react';

export interface CardConfig {
  autoMargin?: boolean;
  noPadding?: boolean;
  background?: string;
}

const defaultContext = {};

export const CardContext = React.createContext<CardConfig>(defaultContext);

export const useCardContext = (): CardConfig =>
  React.useContext<CardConfig>(CardContext);
