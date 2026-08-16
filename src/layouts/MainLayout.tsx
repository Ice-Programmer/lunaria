import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import { AppSidebar } from '../components/AppSidebar';
import { CustomFooter } from '../components/Footer';

const { Footer, Content } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout
      style={{
        width: '100vw',
        height: '100vh',
        minWidth: 1100,
        minHeight: 720,
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

      <Footer style={{ height: 24, backgroundColor: '#ffffff', padding: 0 }}>
        <CustomFooter />
      </Footer>
    </Layout>
  );
};
