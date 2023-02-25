import React, { useState } from "react";
import { SettingFilled, HomeFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Input, Avatar } from "antd";
import Courses from "./courses";
import Feed from "./feed";
import Quiz from "./quiz";

const { Header, Footer, Sider } = Layout;
const { Search } = Input;
let element: any;

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
  getItem("Quiz", "6", <SettingFilled />),
];

const Sidebar: React.FC = () => {
  const [current, setCurrent] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  if (current === "1") {
    element = <Courses />;
  } else if (current === "2") {
    element = <Feed />;
  } else if (current === "6") {
    element = <Quiz />;
  }

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
          onClick={onClick}
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
        {element}
        <Footer style={{ textAlign: "center" }}>
          G-learner ©2023 Created by Scuderia
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
