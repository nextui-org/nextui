import React from 'react';
import { Grid, GridProps, Text, Row, CSS } from '@nextui-org/react';
import { FeatureItem } from './styles';
import withDefaults from '@utils/with-defaults';
import { useRouter } from 'next/router';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

interface Props {
  features: Feature[];
  xs?: GridProps['xs'];
  sm?: GridProps['sm'];
  lg?: GridProps['lg'];
  css?: CSS;
  itemCss?: CSS;
}

export type FeaturesGridProps = Props & GridProps;

const defaultProps = {
  xs: 12,
  sm: 4,
  lg: 3
};

const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  features,
  xs,
  sm,
  lg,
  css,
  itemCss,
  ...props
}) => {
  const router = useRouter();
  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <Grid.Container gap={2} css={{ px: 0, ...(css as any) }} {...props}>
      {features.map((feat, index) => (
        <Grid key={`${feat.title}_${index}`} xs={xs} sm={sm} lg={lg}>
          <FeatureItem
            clickable={!!feat.href}
            css={itemCss}
            onClick={() => (feat.href ? handleClick(feat.href) : undefined)}
          >
            <Row align="center">
              <div className="icon-wrapper">{feat.icon}</div>
              <Text
                className="feature-title"
                css={{
                  my: 0,
                  fontSize: '1.1rem',
                  fontWeight: '$semibold',
                  ml: '$4'
                }}
              >
                {feat.title}
              </Text>
            </Row>
            <Row align="center" css={{ px: '$2', pt: '$4', pb: '$2' }}>
              <Text
                className="feature-description"
                css={{ color: '$accents8' }}
              >
                {feat.description}
              </Text>
            </Row>
          </FeatureItem>
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default withDefaults(FeaturesGrid, defaultProps);
