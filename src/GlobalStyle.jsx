import { createGlobalStyle } from "styled-components";
import "normalize.css";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 16px;
  }

  html, body, #root {
    height: 100%;
  }
`;
