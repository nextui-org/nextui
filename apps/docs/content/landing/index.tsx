import React from "react";
import {
  Moon,
  Magic,
  Flash,
  Devices,
  Server,
  TagUser,
  RoundPointer,
  Maximize,
  CodeDocument,
  HtmlLogo,
} from "@components";

export default {
  topFeatures: [
    {
      title: "Themeable",
      description:
        "Provides a simple way to customize default themes, you can change the colors, fonts, breakpoints and everything you need.",
      icon: <Magic fill="#FF4ECD" />,
    },
    {
      title: "Fast",
      description:
        "Avoids unnecessary styles props at runtime, making it more performant than other UI libraries.",
      icon: <Flash fill="#FF4ECD" />,
    },
    {
      title: "Light & Dark UI",
      description:
        "Automatic dark mode recognition, NextUI automatically changes the theme when it detects HTML theme prop changes.",
      icon: <Moon fill="#FF4ECD" />,
    },
    {
      title: "Unique DX",
      description:
        "NextUI is fully-typed to minimize the learning curve, and provide the best possible developer experience.",
      icon: <Devices fill="#FF4ECD" />,
    },
  ],
  fullFeatures: [
    {
      title: "Server side render (SSR)",
      description:
        "All NextUI components support cross-browser server-side rendering and provides a simple way to implement it in your project.",
      icon: <Server fill="#FF4ECD" />,
    },
    {
      title: "Accessible components",
      description:
        "NextUI components follow the WAI-ARIA guidelines, provide keyboard support and sensible focus management.",
      icon: <TagUser fill="#FF4ECD" />,
    },
    {
      title: "Focus interactions",
      description:
        "Focus ring will appear only when user navigates with keyboard or screen reader.",
      icon: <RoundPointer fill="#FF4ECD" />,
    },
    {
      title: "Built-in media queries",
      description:
        "NextUI provides a set of common media queries that, along with Stitches breakpoints allow you create responsive layouts faster.",
      icon: <Maximize fill="#FF4ECD" />,
    },
    {
      title: "TypeScript based",
      description:
        "Build type safe applications, NextUI has a fully-typed API to minimize the learning curve, and help you build applications.",
      icon: <CodeDocument fill="#FF4ECD" filled={false} />,
    },
    {
      title: "Override components tags",
      description: "A polymorphic `as` prop is included in all NextUI components.",
      icon: <HtmlLogo fill="#FF4ECD" />,
    },
    {
      title: "Critical Path CSS",
      description:
        "Since NextUI is based on Stitches, it only injects the styles which are actually used, so your users don't download unnecessary CSS.",
      icon: <Flash fill="#FF4ECD" />,
    },
    {
      title: "Beautifully designed",
      description:
        "NextUI components are unique and are not tied to any visual trend or design rule, which makes us unique and of course your projects as well.",
      icon: <Magic fill="#FF4ECD" />,
    },
  ],
  themingCode: `import { createTheme } from '@nextui-org/react';

const lightTheme = createTheme({
  type: 'light',
});

return (
  <ShopCard className={lightTheme} />
);


const darkTheme = createTheme({
  type: 'dark',
});

return (
  <ShopCard className={darkTheme} />
);



const lightModernTheme = createTheme({
  type: 'light',
  className: 'light-modern',
  theme: {
    colors: {
      primary: '#7928CA',
      primaryLight: '#d9c2f0',
      success: '#FF1CF7'
    }
  }
});

return (
  <ShopCard className={lightModernTheme}/>
)

const darkModernTheme = createTheme({
  type: 'dark',
  className: 'dark-modern',
  theme: {
    colors: {
      primary: '#7928CA',
      primaryLight: '#582A87',
      success: '#FF1CF7'
    }
  }
});

return (
  <ShopCard className={darkModernTheme} />
);

const lightElegantTheme = createTheme({
  type: 'light',
  className: 'light-elegant',
  theme: {
    colors: {
      primary: '#000000',
      primaryLight: '#AAAAAA',
      success: '#a2a2a2'
    },
    radii: {
      md: '4px'
    }
  }
});

return (
  <ShopCard className={lightElegantTheme}/>
);

const darkElegantTheme = createTheme({
  type: 'dark',
  className: 'dark-elegant',
  theme: {
    colors: {
      primary: '#ffffff',
      primaryLight: '#222222',
      success: '#a2a2a2'
    },
    radii: {
      md: '4px'
    }
  }
});

return (
  <ShopCard className={darkElegantTheme}/>
);


const lightRetroTheme = createTheme({
  type: 'light',
  className: 'light-retro',
  theme: {
    colors: {
      primary: '#FFD34E',
      primaryLight: 'transparent',
      error: '#EE457E'
    }
  }
});

return (
  <ShopCard className={lightRetroTheme}/>
);

const darkRetroTheme = createTheme({
  type: 'dark',
  className: 'dark-retro',
  theme: {
    colors: {
      primary: '#FFD34E',
      primaryLight: 'transparent',
      error: '#EE457E'
    }
  }
});

return (
  <ShopCard className={darkRetroTheme}/>
);


`,
  comparativeCode: {
    nextui: `import * as React from 'react';
import { Input } from '@nextui-org/react';

const MyComponent = () => {
  return (
    <Input.Password bordered labelPlaceholder="Password" />
  );
};

export default MyComponent
`,
    others: `import * as React from 'react';
import ButtonIcon from '@other-library/ButtonIcon';
import InputOutlined from '@other-library/InputOutlined';
import LabelInput from '@other-library/LabelInput';
import AdornmentInput from '@other-library/AdornmentInput';
import ControlForm from '@other-library/ControlForm';
import EyeIcon from '@other-library/icons/EyeIcon';
import EyeIconOff from '@other-library/icons/EyeIconOff';

const MyComponent = () => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  });

  const handleChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ControlForm sx={{ m: 1, width: '25ch' }} variant="outlined">
      <LabelInput htmlFor="outlined-adornment-password">Password</LabelInput>
      <InputOutlined
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange}
        endAdornment={
          <AdornmentInput position="end">
            <ButtonIcon
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <EyeIcon /> : <EyeIconOff />}
            </ButtonIcon>
          </AdornmentInput>
        }
        label="Password"
      />
    </ControlForm>
  );
};

export default MyComponent;`,
  },
  darkModeCode: `// 1. Import createTheme
import { createTheme, NextUIProvider } from "@nextui-org/react"

// 2. Call createTheme and pass your custom values
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {...},
  }
})

// 3. Apply dark theme
// Entry point of your app
const App = () => {
  return (
    <NextUIProvider theme={darkTheme}>
      <App />
    </NextUIProvider>
  )
}

export default App;
`,
  customizationCode: `import React from 'react';
import { Button } from '@nextui-org/react';
import confetti from 'canvas-confetti';

const CustomButton = () => {
  const handleConfetti = () => {
    confetti({...});
  };

  return (
    <Button
      auto
      rounded
      ripple={false}
      size="xl"
      onClick={handleConfetti}
      css={{
        background: '$white',
        fontWeight: '$semibold',
        boxShadow: '$md',
        position: 'relative',
        overflow: 'visible',
        color: '#0F9549',
        px: '$18',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: '$white',
          opacity: 1,
          borderRadius: '$pill',
          transition: 'all 0.4s ease'
        },
        '&:hover': {
          transform: 'translateY(-5px)',
          '&:after': {
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
`,
  stitchesUtilitiesCode: `export const utils = {
  p: (value) => ({
    padding: value
  }),
  m: (value) => ({
    margin: value
  }),
  w: (value) => ({ width: value }),
  h: (value) => ({ height: value }),

  dflex: (value) => ({
    display: 'flex',
    alignItems: value,
    justifyContent: value
  }),
  sizeMin: (value) => ({
    minWidth: value,
    minHeight: value,
    width: value,
    height: value
  }),
  textGradient: (value) => ({
    backgroundImage: 'linear-gradient(value)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }),


  bg: (value) => ({
    background: value
  }),
  bgBlur: (value) => ({
    bf: 'saturate(180%) blur(10px)',
    bg: value
  }),
  bgColor: (value) => ({
    backgroundColor: value
  }),
  backgroundClip: (value) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value
  }),
  bgClip: (value) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value
  }),

}`,
};
