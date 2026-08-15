import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { AppSidebar } from '../components/AppSidebar';

const { Footer, Content } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Layout style={{ flex: 1 }}>
        <AppSidebar />

        <Content
          style={{
            textAlign: 'center',
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 64,
  padding: 0,
  lineHeight: '64px',
};
