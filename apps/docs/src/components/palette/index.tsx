import React, { useMemo } from 'react';
import { Grid, Text, getTokenValue, useTheme } from '@nextui-org/react';
import { toNumber } from 'lodash';
import Item from './item';

export interface Props {
  colors: string[] | string[][];
}

type Color = {
  name: string;
  value: string;
  hexColor: string;
  number?: number;
  textColor?: string;
};

type MappedColor = {
  title: string;
  colors: Color[];
};

const reverseColors: { [key in string]: string } = {
  background: '$foreground',
  foreground: '$background',
  text: '$background',
  border: '$text',
  white: '$black',
  black: '$white',
  backgroundContrast: '$foreground'
};

const getColorTitle = (color: string) => {
  return color.replace(/[0-9]/g, '');
};

const getColorNumber = (color: string) => {
  // check if color doesn't have a number
  if (!color.match(/[0-9]/g)) {
    return -1; // brand colors
  }
  return toNumber(color.replace(/[^0-9]/g, ''));
};

const mapColors = (colors: string[]): Color[] => {
  return colors.map((color) => {
    const num = getColorNumber(color);
    const isBrand = num === -1;
    const isAccent = num >= 0 && num < 10;
    const isBase = num >= 50 && num < 1000;
    const reverseColor = reverseColors[color];

    const textColor = isBrand
      ? '$white'
      : (isAccent && num <= 5) || (isBase && num <= 500)
      ? `$${colors[colors.length - 1]}`
      : `$${colors[1]}`;

    return {
      name: color,
      value: `$${color}`,
      hexColor: getTokenValue('colors', color),
      number: num,
      textColor: reverseColor || textColor
    };
  });
};

const mapMatrixColors = (colors: string[][]): MappedColor[] => {
  return colors.map((row, i) => {
    return {
      title: getColorTitle(row[i]),
      colors: mapColors(row)
    };
  });
};

const Palette: React.FC<Props> = ({ colors }) => {
  const { isDark } = useTheme();

  const isMatrix = Array.isArray(colors[0]);

  const mappedColors = useMemo(() => {
    return isMatrix
      ? mapMatrixColors(colors as string[][])
      : mapColors(colors as string[]);
  }, [isMatrix, colors, isDark]);

  if (isMatrix) {
    return (
      <>
        {mappedColors.map((row: any, i: number) => (
          <Grid.Container
            key={`${row.title}-${i}`}
            wrap="wrap"
            className="palette-colors-row"
            css={{ mb: '$8', position: 'relative' }}
          >
            <Grid xs={12} className="palette-colors-title" css={{ my: '$2' }}>
              <Text css={{ fontWeight: '$semibold', tt: 'capitalize' }}>
                {row.title}
              </Text>
            </Grid>
            {row.colors.map((color: Color, j: number) => (
              <Grid className="palette-colors-col" key={i * j}>
                <Item
                  title={color.name}
                  color={color.value}
                  textColor={color.textColor}
                  hexColor={color.hexColor}
                />
              </Grid>
            ))}
          </Grid.Container>
        ))}
      </>
    );
  }

  return (
    <Grid.Container
      className="palette"
      css={{
        marginBottom: '$sm'
      }}
    >
      {mappedColors?.map((color: any, i) => {
        return (
          <Item
            key={i}
            title={color.name}
            color={color.value}
            textColor={color.textColor}
            hexColor={color.hexColor}
          />
        );
      })}
    </Grid.Container>
  );
};

export default Palette;
