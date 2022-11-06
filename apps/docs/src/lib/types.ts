import * as React from "react";
import {NextComponentType, NextPageContext} from "next";

export type ComponentLayout<P = {}> = React.NamedExoticComponent<P> & {
  Layout: React.FC;
};

export type NextComponent<P = {}> = NextComponentType<NextPageContext, unknown, P> &
  ComponentLayout;

export type ReactFCLayout<P = {}> = React.FC<P> & {
  Layout: React.FC;
};
