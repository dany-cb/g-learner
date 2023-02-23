import React, { useState } from "react";
import { SettingFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Input, Avatar } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("My Courses", "1", <SettingFilled />),
  getItem("Feed", "2", <SettingFilled />),
  getItem("Assignment", "sub1", <SettingFilled />, [
    getItem("Ongoing", "3"),
    getItem("Pending", "4"),
    getItem("Pending", "5"),
  ]),
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div>
          <Avatar
            size={50}
            style={{
              color: "#2596be",
              fontSize: 25,
              marginTop: 20,
              marginLeft: 18,
              marginBottom: 20,
              border: "1px solid #2596be",
            }}
          >
            G
          </Avatar>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Search
            placeholder="Search here"
            allowClear
            onSearch={onSearch}
            style={{
              width: 450,
              height: 150,
              marginTop: 20,
              marginLeft: 50,
            }}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          G-learner ©2023 Created by Scuderia
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
