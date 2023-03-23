import React, { useState, useEffect } from "react";
import {
  ExperimentFilled,
  FolderOpenOutlined,
  DashboardOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Avatar } from "antd";
import { useRouter } from "next/router";
import "../../src/styles/Sidebar.module.css";

const { Sider } = Layout;
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
  getItem("My Courses", "1", <FolderOpenOutlined />),
  getItem("Feed", "2", <CodeSandboxOutlined />),
  getItem("Assesments", "6", <DashboardOutlined />, [
    getItem("Ongoing", "3"),
    getItem("Pending", "4"),
    getItem("Completed", "5"),
  ]),
  // getItem("Quiz", "6", <ExperimentFilled />),
];

interface Props {
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [defaultKey, setDefaultKey] = useState(["1"]);
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    console.dir(e);

    if (e.key === "1") {
      router.push("/courses");
    } else if (e.key === "2") {
      router.push("/feed");
    } else if (e.key === "3") {
      router.push("/assessments/ongoing");
    } else if (e.key === "4") {
      router.push("/assessments/pending");
    } else if (e.key === "5") {
      router.push("/assessments/completed");
    } else if (e.key === "6") {
      router.push("/assessments");
    }
  };

  useEffect(() => {
    if (router.pathname === "/courses") {
      setDefaultKey(["1"]);
    } else if (router.pathname === "/feed") {
      setDefaultKey(["2"]);
    } else if (router.pathname === "/assessments/ongoing") {
      setDefaultKey(["3"]);
    } else if (router.pathname === "/assessments/pending") {
      setDefaultKey(["4"]);
    } else if (router.pathname === "/assessments/completed") {
      setDefaultKey(["5"]);
    } else if (router.pathname === "/assessments") {
      setDefaultKey(["6"]);
    }
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh",backgroundColor:"#f4f8f0" }}>
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{backgroundColor:"#201c1c", height: "98.5vh", overflow:"auto", position:"sticky",top:6,left:3}}
          className="ms-3 rounded-4"
        >
          <div>
            <Avatar
              size={45}
              shape="square"
              style={{
                color: "#ffffff",
                fontSize: 25,
                marginTop: 20,
                marginLeft: 18,
                marginBottom: 20,
                border: "1px solid #ffffff",
              }}
            >
              GL
            </Avatar>
          </div>
          <Menu
            onClick={onClick}
            theme="dark"
            defaultSelectedKeys={defaultKey}
            mode="inline"
            items={items}
            style={{backgroundColor:"#201c1c",color:"#fff"}}
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
