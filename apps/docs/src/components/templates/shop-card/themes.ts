import { createTheme } from '@nextui-org/react';

export const lightModernTheme = createTheme({
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

export const darkModernTheme = createTheme({
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

export const lightElegantTheme = createTheme({
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

export const darkElegantTheme = createTheme({
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

export const lightRetroTheme = createTheme({
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

export const darkRetroTheme = createTheme({
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
