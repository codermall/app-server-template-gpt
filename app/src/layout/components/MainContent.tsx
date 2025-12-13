import React from 'react';
import { Layout } from 'antd';

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Layout.Content style={{ padding: 16, overflow: 'auto' }}>
      <div style={{  margin: '0 auto', height: '100%' }}>{children}</div>
    </Layout.Content>
  );
};

