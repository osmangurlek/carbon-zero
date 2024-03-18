// src/App.js
import React, { useState } from 'react';
import RoleForm from './components/RoleForm';
import WorkspaceForm from './components/WorkspaceForm';
import UserForm from './components/UserForm';
import EmissionForm from './components/EmissionForm';
import {Layout, Menu, theme} from 'antd';
import './App.css';
const { Header, Content, Sider } = Layout;

const NavigationMenu = ({ onMenuClick }) => (
    <Menu onClick={onMenuClick} mode="inline" style={{ height: '100%', borderRight: 0,}}>
        <Menu.Item key="homes">Home</Menu.Item>
        <Menu.SubMenu key="adds" title="Form Add">
            <Menu.Item key="roles">Role Form</Menu.Item>
            <Menu.Item key="workspaces">Workspace Form</Menu.Item>
            <Menu.Item key="users">User Form</Menu.Item>
            <Menu.Item key="emissions">Emission Form</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="lists">List</Menu.Item>
    </Menu>
)
function App() {
    const [currentPage, setCurrentPage] = useState('roles');

    const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

    const handleMenuClick = e => {
        setCurrentPage(e.key);
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'roles':
                return <RoleForm />
            case 'workspaces':
                return <WorkspaceForm />
            case 'users':
                return <UserForm />
            case 'emissions':
                return <EmissionForm />
            default:
                return <RoleForm />
        }
    }
  return (
      <Layout style={{ marginBottom: "auto" }}>
          <Header
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#001529'
            }}
          >
          <div className="demo-logo" style={{ color: '#fff' }} />
              <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{
                      flex: 1,
                      minWidth: 0,
                  }}
              >
                  <Menu.Item>Carbon Emission Tracking Application</Menu.Item>
              </Menu>
          </Header>
          <Layout>
              <Sider
                width={200}
                style={{
                    background: colorBgContainer,
                }}
              >
                  <NavigationMenu onMenuClick={handleMenuClick}/>
              </Sider>
              <Layout
                syle={{
                    padding: '0 24px 24px',
                }}
              >
                  <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                  >
                      {renderPage()}
                  </Content>
              </Layout>
          </Layout>
      </Layout>
  );
}

export default App;