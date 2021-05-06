import React from 'react';
import withDefaults from '@utils/with-defaults';
import { NormalSizes, NormalLoaders, ButtonColors } from '@utils/prop-types';
import { Loading } from '@components';

interface Props {
  color: ButtonColors | string;
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
}) => {
  return (
    <div className="button-loading">
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
          background-color: var(--next-ui-button-bg);
        }
      `}</style>
    </div>
  );
};
const MemoButtonLoading = React.memo(ButtonLoading);

export default withDefaults(MemoButtonLoading, defaultProps);
