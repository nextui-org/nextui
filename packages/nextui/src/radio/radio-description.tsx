import React from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import clsx from '../utils/clsx';

interface Props {
  className?: string;
}

const defaultProps = {
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type RadioDescriptionProps = Props & typeof defaultProps & NativeAttrs;

const RadioDescription: React.FC<
  React.PropsWithChildren<RadioDescriptionProps>
> = ({ className, children, ...props }) => {
  const theme = useTheme();

  return (
    <span className={clsx('nextui-radio-description', className)} {...props}>
      {children}
      <style jsx>{`
        .nextui-radio-description {
          color: ${theme.palette.accents_5};
          font-size: calc(var(--radio-size) * 0.85);
          padding-left: calc(var(--radio-size) + var(--radio-size) * 0.375);
        }
      `}</style>
    </span>
  );
};

const MemoRadioDescription = React.memo(RadioDescription);

export default withDefaults(MemoRadioDescription, defaultProps);
