import React from 'react';
import { Grid, Text } from '@nextui-org/react';
import { capitalize, toNumber } from 'lodash';
import Item from './item';

export interface Props {
  colors: string[] | string[][];
  inverted?: boolean;
}

type Color = {
  name: string;
  value: string;
  textColor?: string;
};

type MappedColor = {
  title: string;
  colors: Color[];
};

const getColorTitle = (color: string) => {
  return capitalize(color.replace(/[0-9]/g, ''));
};

const getColorNumber = (color: string) => {
  return toNumber(color.replace(/[^0-9]/g, ''));
};

const mapColors = (colors: string[][]): MappedColor[] => {
  return colors.map((row, i) => {
    return {
      title: getColorTitle(row[i]),
      colors: row.map((color) => {
        const num = getColorNumber(color);
        return {
          name: capitalize(color),
          value: color,
          number: num,
          textColor: num <= 500 ? row[row.length - 1] : row[1]
        };
      })
    };
  });
};

const Palette: React.FC<Props> = ({ colors, inverted }) => {
  const isMatrix = Array.isArray(colors[0]);

  if (isMatrix) {
    const colorsMatrix = mapColors(colors as string[][]);
    return (
      <>
        {colorsMatrix.map((row: MappedColor, i: number) => (
          <Grid.Container
            key={i}
            wrap="wrap"
            className="palette-colors-row"
            css={{ mb: '$8', position: 'relative' }}
          >
            <Grid xs={12} className="palette-colors-title" css={{ my: '$2' }}>
              <Text css={{ fontWeight: '$semibold' }}>{row.title}</Text>
            </Grid>
            {row.colors.map((color: Color, j: number) => (
              <Grid className="palette-colors-col" key={i * j}>
                <Item color={color.value} textColor={color.textColor} />
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
      {colors?.map((color, i) => {
        if (typeof color !== 'string') {
          return null;
        }
        return <Item key={i} color={color} inverted={inverted} />;
      })}
    </Grid.Container>
  );
};

export default Palette;
