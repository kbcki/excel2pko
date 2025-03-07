import * as React from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import { App } from "./App";
import { AppContextProvider } from "./context/AppContext";
import { NavigationContextProvider } from "./context/NavigationContext";

/* global document, Office, module, require, HTMLElement */

const title = "Contoso Task Pane Add-in";

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <FluentProvider style={{ height: "100%" }} theme={webLightTheme}>
      <AppContextProvider>
        <NavigationContextProvider>
          <App title={title} />
        </NavigationContextProvider>
      </AppContextProvider>
    </FluentProvider>
  );
});

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    const NextApp = require("./App").App;
    root?.render(NextApp);
  });
}
