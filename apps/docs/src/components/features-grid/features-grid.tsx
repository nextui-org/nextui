import React from 'react';
import { Grid, GridProps, Text, Row } from '@nextui-org/react';
import { FeatureItem } from './styles';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Props {
  features: Feature[];
}

export type FeaturesGridProps = Props & GridProps;

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features, ...props }) => {
  return (
    <Grid.Container gap={2} {...props}>
      {features.map((feat, index) => (
        <Grid key={`${feat.title}_${index}`} xs={12} sm={4} lg={3}>
          <FeatureItem>
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
                css={{ color: '$accents7' }}
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

export default FeaturesGrid;
