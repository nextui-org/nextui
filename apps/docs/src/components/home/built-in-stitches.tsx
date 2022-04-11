import * as React from 'react';
import NextLink from 'next/link';
import { InView } from 'react-intersection-observer';
import cn from 'classnames';
import { Section, Title, Subtitle, BlockLink, Box } from '@primitives';
import * as react from '@nextui-org/react';
import landingContent from '@content/landing';
import { Blockholder } from '@components';

import dynamic from 'next/dynamic';

const DynaminCodeDemo = dynamic(() => import('../code-demo/code-demo'), {
  ssr: true
});

const items = [
  {
    id: 'property_shorthands',
    title: 'Property shorthands',
    description:
      'Using a shorthand property, you can write more concise and more readable CSS, saving time and energy.',
    lines: '2-9'
  },
  {
    id: 'property_bundles',
    title: 'Property bundles',
    description:
      'Property bundles are CSS properties that let you set the values of multiple other CSS properties simultaneously.',
    lines: '11-26'
  },
  {
    id: 'simplify_syntax',
    title: 'Simplify syntax',
    description:
      'NextUI provides a set of out of the box Stitches utilities that simplify CSS syntax.',
    lines: '29-48'
  }
];

const BuiltInStitchesSection = () => {
  const [activeItem, setActiveItem] = React.useState(items[0]);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleChange = (value: number) => {
    setActiveItem(items[value - 1]);
  };

  return (
    <InView as="section" className="inview-section" onChange={setIsVisible}>
      <react.Spacer y={10} css={{ '@xsMax': { mt: '$16' } }} />
      <Section css={{ position: 'relative' }}>
        <Box
          css={{
            position: 'absolute',
            top: 0,
            left: '-10%',
            zIndex: '-$1',
            '@xsMax': {
              top: '20%',
              left: '-90%'
            }
          }}
        >
          <img src="/stitches-gradient.svg" alt="theming background" />
        </Box>
        <react.Row justify="flex-start">
          <Title>Built-in Stitches</Title>
        </react.Row>
        <react.Row justify="flex-start">
          <Title color="violet">utilities.</Title>
        </react.Row>
        <Subtitle>
          NextUI provides a set of out of the box&nbsp;
          <react.Link
            href="https://stitches.dev/"
            rel="noreferer noopener"
            target="_blank"
            css={{ color: '#FF1CF7' }}
          >
            Stitches
          </react.Link>
          &nbsp;utilities for speeding up your workflow by abbreviating CSS
          properties, grouping multiple CSS properties together, or simplifying
          a tricky syntax.
        </Subtitle>
        <react.Grid.Container gap={2}>
          <react.Grid
            xs={12}
            sm={6}
            css={{
              pl: 0,
              '@xsMax': {
                pr: '0'
              }
            }}
          >
            <react.Col>
              <react.Collapse.Group onChange={handleChange}>
                {items.map(({ id, title, description }) => (
                  <react.Collapse
                    key={id}
                    title={title}
                    showArrow={false}
                    className={cn({ active: activeItem.id === id })}
                    expanded={id === items[0].id}
                    css={{
                      br: '$lg',
                      border: 'none',
                      p: '0 $lg',
                      margin: '$md 0',
                      '& .nextui-collapse-title': {
                        color: '$accents4',
                        fontSize: '1.7rem',
                        transition: 'color 0.2s ease-in-out'
                      },
                      '&.active': {
                        bf: 'saturate(180%) blur(14px)',
                        bg: 'rgba(255, 255, 255, 0.05)',
                        boxShadow: '$md'
                      },
                      '&.active .nextui-collapse-view': {
                        pb: 0,
                        transition: 'all 0.25s ease-in-out'
                      },
                      '&.active .nextui-collapse-title': {
                        color: '$text'
                      },
                      '&:hover': {
                        '&:not(.active) .nextui-collapse-title': {
                          color: '$accents5'
                        }
                      }
                    }}
                  >
                    <react.Text
                      css={{
                        fs: '1.4rem',
                        color: '$accents6',
                        '@xsMax': {
                          fs: '1rem'
                        },
                      }}
                    >
                      {description}
                    </react.Text>
                  </react.Collapse>
                ))}
              </react.Collapse.Group>
              <NextLink href="/docs/theme/utilities" passHref>
                <BlockLink color="violet">Learn more</BlockLink>
              </NextLink>
            </react.Col>
          </react.Grid>
          <react.Grid
            xs={12}
            sm={6}
            css={{
              pr: 0,
              mt: '$9',
              '@mdMax': {
                pl: '0'
              },
              '@xsMax': {
                mt: '$18'
              }
            }}
          >
            <react.Col
              css={{
                dflex: 'center',
                fd: 'column',
                ai: 'flex-start',
                h: '100%',
                mt: '-10%'
              }}
            >
              {isVisible ? (
                <DynaminCodeDemo
                  showWindowIcons
                  language="jsx"
                  value={landingContent.stitchesUtilitiesCode}
                  line={activeItem.lines}
                  css={{
                    maxHeight: 420
                  }}
                />
              ) : (
                <Blockholder height="420px" />
              )}
            </react.Col>
          </react.Grid>
        </react.Grid.Container>
      </Section>
    </InView>
  );
};

export default BuiltInStitchesSection;
