import { createContext, useContext, useEffect, useState } from 'react';

const HeaderContext = createContext();

export function useHeaderContext() {
  return useContext(HeaderContext);
}

export function HeaderContextProvider({ children }) {
  const [headerState, setHeaderState] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setHeaderState(true);
    }
  },[]);

  return (
    <HeaderContext.Provider value={{ headerState, setHeaderState }}>
      {children}
    </HeaderContext.Provider>
  );
}