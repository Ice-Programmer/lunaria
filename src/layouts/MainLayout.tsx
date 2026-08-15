import React from 'react';

import { Layout } from 'antd';
import { Outlet } from 'react-router';

const { Header, Footer, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Header style={headerStyle}>Header</Header>

      <Layout style={{ flex: 1 }}>
        <Sider width={200} style={siderStyle}>
          Sider
        </Sider>

        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>

      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#0958d9',
  overflow: 'auto',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  padding: 0,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
