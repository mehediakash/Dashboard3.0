import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem("Users", "sub0", <UserOutlined />, [
      getItem("Merchant", "1"),
      getItem("All User", "2"),
    ]),
    getItem("Order", "0", <FileOutlined />),

    getItem("Banner", "sub2", <TeamOutlined />, [
      getItem("upload Banner", "3"),
      getItem("All Banner", "4"),
    ]),
    getItem("Category ", "sub3", <TeamOutlined />, [
      getItem("Add Category", "5"),
      getItem("Add Sub Category", "6"),
    ]),
    getItem("Product", "sub4", <TeamOutlined />, [
      getItem("Upload Product", "7"),
      getItem("All Product", "8"),
    ]),
    getItem("Discount", "sub5", <TeamOutlined />, [
      getItem("Add Discount", "9"),
      getItem("View Discount", "10"),
    ]),
  ];

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["sub0"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 70 : 200, // Adjust marginLeft dynamically
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
