import React, { ReactNode } from 'react';
import { Content, Wrapper } from './Layout.style';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Layout;
