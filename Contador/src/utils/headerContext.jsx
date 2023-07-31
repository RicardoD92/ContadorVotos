import { createContext, useContext, useState } from 'react';

const HeaderContext = createContext();

export function useHeaderContext() {
  return useContext(HeaderContext);
}

export function HeaderContextProvider({ children }) {
  const [headerState, setHeaderState] = useState(false);

  return (
    <HeaderContext.Provider value={{ headerState, setHeaderState }}>
      {children}
    </HeaderContext.Provider>
  );
}