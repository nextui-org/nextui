import React from 'react';
import { Moon, Magic, Flash, Devices } from '@components';

export default {
  topFeatures: [
    {
      title: 'Themeable',
      description:
        'Provides a simple way to customize default themes, you can change the colors, fonts, breakpoints and everything you need.',
      icon: <Magic fill="#FF4ECD" />
    },
    {
      title: 'Fast',
      description:
        'Avoids unnecessary styles props at runtime, making it more performant than other UI libraries.',
      icon: <Flash fill="#FF4ECD" />
    },
    {
      title: 'Light & Dark UI',
      description:
        'Automatic dark mode recognition, NextUI automatically changes the theme when detects HTML theme prop changes.',
      icon: <Moon fill="#FF4ECD" />
    },
    {
      title: 'Unique DX',
      description:
        'NextUI is fully-typed to minimize the learning curve, and provide the best possible developer experience.',
      icon: <Devices fill="#FF4ECD" />
    }
  ],
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

export default MyComponent;`
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
    confetti({
      zIndex: 999,
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
        background: '$white',
        fontWeight: '$semibold',
        boxShadow: '$md',
        position: 'relative',
        overflow: 'visible',
        color: '$green800',
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
`
};
