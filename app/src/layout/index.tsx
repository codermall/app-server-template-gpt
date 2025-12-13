import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Sidemenu } from './components/Sidemenu';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sidemenu />
      <AntLayout>
        <Header />
        <MainContent>{children}</MainContent>
      </AntLayout>
    </AntLayout>
  );
};

