import React from 'react';
import withDefaults from '../../utils/with-defaults';
import {
  NormalSizes,
  NormalLoaders,
  NormalColors,
} from '../../utils/prop-types';
import { Loading } from '../index';

interface Props {
  color?: NormalColors | string;
  background?: string | null;
  size?: NormalSizes;
  type?: NormalLoaders;
}

const defaultProps = {
  size: 'small' as NormalSizes,
  type: 'default' as NormalLoaders,
};

export type ButtonLoadingProps = Props & typeof defaultProps;

const ButtonLoading: React.FC<React.PropsWithChildren<ButtonLoadingProps>> = ({
  color,
  size,
  type,
  background,
  ...props
}) => {
  return (
    <div className="button-loading" {...props}>
      <Loading
        size={size}
        color={color}
        gradientBackground={background}
        type={type}
      />
      <style jsx>{`
        .button-loading {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: var(--next-ui-button-border-radius);
          background-color: var(--next-ui-button-bg);
        }
      `}</style>
    </div>
  );
};
const MemoButtonLoading = React.memo(ButtonLoading);

export default withDefaults(MemoButtonLoading, defaultProps);
