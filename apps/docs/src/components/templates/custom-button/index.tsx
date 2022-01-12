import React from 'react';
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';

const CustomButton = () => {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.75, y: 0.8 }
    });
  };
  return (
    <Button
      auto
      rounded
      ripple={false}
      size="xl"
      onClick={handleConfetti}
      css={{
        background: 'linear-gradient(180deg, $green200 25%, $green500 100%)',
        textTransform: 'uppercase',
        fontWeight: '$semibold',
        textShadow: '1px 1px 4px  $colors$green700',
        boxShadow: '$md',
        position: 'relative',
        overflow: 'visible',
        color: '$background',
        px: '$18',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgb139, 243, 156, 0,1)',
          opacity: 1,
          borderRadius: '$pill',
          transition: 'all 0.5s ease'
        },
        '&:hover': {
          transform: 'translateY(-5px)',
          '&:after': {
            background: 'rgb(139, 243, 156, 1)',
            transform: 'scaleX(1.5) scaleY(1.6)',
            opacity: 0
          }
        },
        '&:active': {
          transform: 'translateY(-2px)'
        }
      }}
    >
      Click me
    </Button>
  );
};

export default CustomButton;
