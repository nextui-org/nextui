import React from 'react';

export interface ModalConfig {
  autoMargin?: boolean;
  close?: () => void;
}

const defaultContext = {};

export const ModalContext = React.createContext<ModalConfig>(defaultContext);

export const useModalContext = (): ModalConfig =>
  React.useContext<ModalConfig>(ModalContext);
