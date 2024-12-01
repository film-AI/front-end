import { createContext, useContext, useState } from 'react';

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [nightMode, setNightMode] = useState(false);

  return (
    <Context.Provider value={{ nightMode, setNightMode }}>
      {children}
    </Context.Provider>
  );
};
export const useContextHook = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
