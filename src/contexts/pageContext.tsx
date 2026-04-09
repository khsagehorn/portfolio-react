"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PageContextType {
  contentPanelActive: boolean;
  toggleActivePanel: () => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageContextProvider = ({ children }: { children: ReactNode }) => {
  const [contentPanelActive, setContentPanelActive] = useState<boolean>(false);

  const toggleActivePanel = () => {
    setContentPanelActive(!contentPanelActive);
  };

  return (
    <PageContext.Provider value={{ contentPanelActive, toggleActivePanel }}>
      {children}
    </PageContext.Provider>
  );
};

// custom hook to safely use pageContext
export const usePageContext = () => {
  const context = useContext(PageContext);

  if (context === undefined) {
    throw new Error("usePageContext must be used in theme provider");
  }

  return context;
};
