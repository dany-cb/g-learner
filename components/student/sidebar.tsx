import React, { useState } from "react";
import { SettingFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Avatar } from "antd";
import Router from "next/router";

const { Sider, Footer } = Layout;

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
    getItem("Completed", "5"),
  ]),
  getItem("Quiz", "6", <SettingFilled />),
];

interface Props {
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    if (e.key === "1") {
      Router.push("/courses");
    } else if (e.key === "2") {
      Router.push("/feed");
    } else if (e.key === "6") {
      Router.push("/quiz");
    }
  };

  return (
    <>
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
        <Layout className="site-layout" style={{ minHeight: "100vh" }}>
          {children}
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
