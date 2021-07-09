import React, { useCallback } from 'react';
import { useTheme, NextUIThemes } from '@nextui-org/react';
import { get, replace } from 'lodash';
import { invertHex, hexToRGBA, hexFromString } from '@utils/index';

export interface Props {
  colors?: string[];
  inverted?: boolean;
}

const Palette: React.FC<Props> = ({ colors, inverted }) => {
  const theme = useTheme() as NextUIThemes;
  const renderItem = useCallback(
    (color, index) => {
      const hexColor = get(theme.palette, color || 'primary');
      const textColor = inverted ? invertHex(hexColor) : theme.palette.white;
      const shadowColor =
        color === 'gradient'
          ? hexFromString(color, theme.palette.primary, true)
          : get(theme.palette, color || 'primary');

      return (
        <div key={index} className="color">
          <p className="text">{replace(color, '_', ' ')}</p>
          <style jsx>{`
            .color {
              background: ${hexColor};
              margin-right: 20px;
              margin-bottom: 20px;
              width: 100px;
              height: 100px;
              display: flex;
              text-transform: capitalize;
              justify-content: center;
              align-items: center;
              box-shadow: 0 20px 35px -10px ${hexToRGBA(shadowColor, 0.5)};
              border-radius: ${theme.layout.radius};
              transition: all 0.25s ease;
            }
            .color:hover {
              transform: translateY(5px);
              box-shadow: 0 0 0 0 ${hexToRGBA(shadowColor, 0.5)};
            }
            .text {
              color: ${textColor};
              font-weight: bold;
              font-size: 13px;
            }
          `}</style>
        </div>
      );
    },
    [inverted]
  );

  return (
    <div className="palette">
      {colors?.map(renderItem)}
      <style jsx>{`
        .palette {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: ${theme.layout.gapHalf};
        }
      `}</style>
    </div>
  );
};

const MemoPalette = React.memo(Palette);

export default MemoPalette;
