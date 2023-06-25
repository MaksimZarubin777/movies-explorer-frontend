import React, { createContext, useState } from 'react';

const BurgerMenuContext = createContext();

export const BurgerMenuProvider = ({ children }) => {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <BurgerMenuContext.Provider value={{ isBurgerMenuOpen, toggleBurgerMenu }}>
      {children}
    </BurgerMenuContext.Provider>
  );
};

export default BurgerMenuContext;
