import React, { useCallback } from 'react';
import { useTheme, NextUIThemes, Grid } from '@nextui-org/react';
import { get, replace } from 'lodash';
import { invertHex, hexToRGBA, hexFromString } from '@utils/index';

export interface Props {
  colors?: string[];
  inverted?: boolean;
}

const Palette: React.FC<Props> = ({ colors, inverted }) => {
  const theme = useTheme() as NextUIThemes;

  const renderItem = useCallback(
    (color: string) => {
      const hexColor = get(theme.palette, color || 'primary');
      const textColor = inverted ? invertHex(hexColor) : theme.palette.white;
      const shadowColor =
        color === 'gradient'
          ? hexFromString(color, theme.palette.primary, true)
          : get(theme.palette, color || 'primary');

      return (
        <div key={color} className="color">
          <p className="text">{replace(color, '_', ' ')}</p>
          <style jsx>{`
            .color {
              background: ${hexColor};
              margin-bottom: 20px;
              width: 100px;
              height: 100px;
              display: flex;
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
              text-transform: capitalize;
              font-size: 13px;
            }
            @media only screen and (max-width: ${theme.breakpoints.sm.min}) {
              .color {
                width: 80px;
                height: 80px;
              }
              .text {
                font-size: 10px;
              }
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
          --grid-gap-unit: calc(2 * 4pt);
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          grid-gap: calc(2 * 4pt);
          margin: calc(-1 * var(--grid-gap-unit));
          width: calc(100% + var(--grid-gap-unit) * 2);
          padding-bottom: ${theme.layout.gapHalf};
        }
      `}</style>
    </div>
  );
};

const MemoPalette = React.memo(Palette);

export default MemoPalette;
