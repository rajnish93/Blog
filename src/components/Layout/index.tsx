import React, { FC, ReactNode, useContext } from 'react';
import { ThemeContext } from '../../providers';
import { Global } from './styles';
import { Footer } from '../Theme';

export const Layout: FC<ReactNode> = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Global theme={theme} />
      {children}
      <Footer />
    </>
  );
};
