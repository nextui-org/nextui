import { AnimationProps } from 'framer-motion';

type Animations = { [key: string]: AnimationProps['animate'] };

export default {
  nextui: {
    title: {
      scale: 1
    },
    subtitle: {
      translateY: 0
    },
    price: {
      translateY: 0,
      scale: 1
    },
    oldPrice: {
      translateY: 0
    },
    discount: {
      translateY: 0,
      translateX: 0
    },
    productContainer: {
      scale: 1
    },
    productSizeButton: {
      borderRadius: 8
    }
  },
  modern: {
    title: {
      fontSize: '24px'
    },
    subtitle: {
      translateY: -5
    },
    price: {
      translateY: 4,
      scale: 1.2
    },
    oldPrice: {
      translateY: 4,
      translateX: 5
    },
    discount: {
      marginLeft: 0,
      scale: 0.8,
      translateY: -20,
      translateX: -120
    },
    productContainer: {
      scale: 1.25
    },
    productSizeButton: {
      borderRadius: 20
    }
  },
  elegant: {
    productContainer: {
      scale: 1.2,
      borderRadius: '4px'
    },
    price: {
      scale: 1
    },
    oldPrice: {
      scale: 0.9,
      translateX: -10
    },
    discount: {
      scale: 0.8,
      translateX: -10
    },
    productSizeButton: {
      borderRadius: '4px'
    }
  },
  retro: {
    title: {
      fontSize: '24px'
    },
    subtitle: {
      translateY: -5
    },
    price: {
      translateY: 4,
      scale: 1.2
    },
    oldPrice: {
      scale: 0.8,
      translateY: -20,
      translateX: -80
    },
    discount: {
      marginLeft: 0,
      scale: 0.7,
      translateY: -20,
      translateX: -80
    },
    productContainer: {
      borderRadius: '0px'
    },
    productSizeButton: {
      borderRadius: '0px'
    }
  }
} as { nextui: Animations; modern: Animations };
