import * as React from "react";
import { createContext, PropsWithChildren } from "react";

import { Pages } from "../consts";

type NavigationContextProps = {
  currentPage: Pages;
  setCurrentPage: (page: Pages) => void;
};

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationContextProvider = ({ children }: PropsWithChildren) => {
  const [currentPage, setCurrentPage] = React.useState<Pages>(Pages.SPLASH);

  return <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>{children}</NavigationContext.Provider>;
};

export const useNavigationContext = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within a NavigationContextProvider");
  }

  return context;
};
