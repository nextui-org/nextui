import React, { useMemo, useContext } from 'react';
import useTheme from '../use-theme';
import {
  AlignContent,
  AlignItems,
  Justify,
  Direction
} from '../utils/prop-types';
import { CardContext } from './card-context';
import clsx from '../utils/clsx';
import withDefaults from '../utils/with-defaults';

interface Props {
  justify?: Justify;
  direction?: Direction;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  noPadding?: boolean;
  width?: string;
  height?: string;
  className?: string;
}

const defaultProps = {
  width: '100%',
  height: 'auto',
  justify: 'inherit',
  alignItems: 'inherit',
  alignContent: 'inherit',
  direction: 'column',
  noPadding: false,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CardBodyProps = Props & typeof defaultProps & NativeAttrs;

const CardBody: React.FC<React.PropsWithChildren<CardBodyProps>> = ({
  className,
  justify,
  alignContent,
  alignItems,
  noPadding: noPaddingProp,
  direction,
  width,
  height,
  children,
  ...props
}) => {
  const theme = useTheme();
  const { noPadding: noPaddingContext } = useContext(CardContext);

  const noPadding = useMemo(() => {
    return noPaddingContext !== undefined ? noPaddingContext : noPaddingProp;
  }, [noPaddingProp, noPaddingContext]);

  return (
    <div
      className={clsx(
        'nextui-card-body',
        { 'nextui-card-body-no-padding': noPadding },
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        .nextui-card-body {
          display: flex;
          flex: 1 1 auto;
          width: ${width};
          height: ${height};
          flex-direction: ${direction};
          justify-content: ${justify};
          align-items: ${alignItems};
          align-content: ${alignContent};
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          overflow-y: auto;
          position: relative;
          text-align: left;
        }
        .nextui-card-body.nextui-card-body-no-padding {
          padding: 0;
        }
        .nextui-card-body > :global(*:first-child) {
          margin-top: 0;
        }
        .nextui-card-body > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

const MemoCardBody = React.memo(CardBody);

export default withDefaults(MemoCardBody, defaultProps);
