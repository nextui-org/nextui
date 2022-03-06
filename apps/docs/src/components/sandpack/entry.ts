export const lightThemeEntry = `
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { NextUIProvider, createTheme, Container } from '@nextui-org/react';
import App from "./App";

const lightTheme = createTheme({
  type: 'light'
})

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <NextUIProvider theme={lightTheme}>
      <Container lg gap={2} css={{ mt:'$10' }}>
        <App />
      </Container>
    </NextUIProvider>
  </StrictMode>,
  rootElement
);
`;

export const darkThemeEntry = `
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { NextUIProvider, createTheme, Container } from '@nextui-org/react';
import App from "./App";

const darkTheme = createTheme({
  type: 'dark'
})

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <NextUIProvider theme={darkTheme}>
      <Container lg gap={2} css={{ mt:'$10' }}>
        <App />
      </Container>
    </NextUIProvider>
  </StrictMode>,
  rootElement
);
`;
