import React from 'react';
import css from 'styled-jsx/css';
import { __DEV__ } from './assertion';
import { addChildrenClass } from './react';

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  const { className, styles } = css.resolve`
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0px;
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
  `;

  const childrenWithClass = addChildrenClass(children, className);

  return (
    <>
      {childrenWithClass}
      {styles}
    </>
  );
};

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}

export default VisuallyHidden;
