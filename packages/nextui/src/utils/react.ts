import * as React from 'react';

export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

export function addChildrenClass(children: React.ReactNode, className: string) {
  const validChildren = getValidChildren(children);
  return validChildren.map((child) => {
    return React.cloneElement(child, {
      className: `${child.props.className} ${className}`
    });
  });
}
