import { ThemeProvider } from "@/theme/ThemeContext";
import React from "react";
import Main from "./main";

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}
