import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout, Steps, theme, Breadcrumb, Badge, Avatar, Input } from "antd";
import {
  HomeFilled,
  BellTwoTone,
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const assesments: React.FC = () => {
  const router = useRouter();
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onChange = (value: number) => {
    if (value === 0) {
      router.push("/assessments/completed");
    } else if (value === 1) {
      router.push("/assessments/ongoing");
    } else if (value === 2) {
      router.push("/assessments/pending");
    }
  };
  return (
    <>
      <div className="m-3 ms-5 mt-4">
        <nav className="">
          <div className="d-flex justify-content-between">
            <Breadcrumb
              style={{ minWidth: 350, backgroundColor: "#ffff" }}
              className="d-flex rounded-4 ps-4 pt-2"
            >
              <Breadcrumb.Item>
                <Link href="/courses">
                  <HomeFilled style={{ paddingLeft: 5 }} />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Assessments</Breadcrumb.Item>
            </Breadcrumb>
            <Input
              className="rounded-4 ms-4 border border-0"
              placeholder="🔍 Search here for latest feed"
              allowClear
              style={{
                width: 780,
                marginRight: 65,
                height: 43,
              }}
            />
            <div
              className="d-flex justify-content-between"
              style={{ marginRight: 85 }}
            >
              <Badge
                count={3}
                className="bg-light"
                style={{ fontSize: "13px" }}
              >
                <Avatar
                  className=""
                  size={45}
                  shape="square"
                  style={{ backgroundColor: "#201c1c", lineHeight: "31px" }}
                  icon={
                    <BellOutlined
                      style={{ fontSize: "20px" }}
                      className="rounded-4"
                    />
                  }
                />
              </Badge>{" "}
              <Avatar
                style={{ backgroundColor: "#201c1c", lineHeight: "31px" }}
                size={45}
                shape="square"
                className="mx-3 rounded-3"
                icon={
                  <CalendarOutlined
                    style={{ fontSize: "20px" }}
                    className="rounded-4"
                  />
                }
              />{" "}
              <Avatar
                style={{ backgroundColor: "#201c1c", verticalAlign: "middle" }}
                size={45}
                shape="square"
                className="rounded-3"
              >
                U
              </Avatar>
            </div>
          </div>
        </nav>
      </div>
      
      <Content style={{ margin: "10px 26px" }}>

        <div
          style={{
            padding: 24,
            minHeight: "75vh",
            color: "black",
          }}
        >
          <Steps
            progressDot
            current={4}
            onChange={onChange}
            direction="vertical"
            items={[
              {
                title: "Completed",
                description: "Your log of completed assignments.",
              },
              {
                title: "In Progress",
                description: "Assignments which you are currently working on.",
              },
              {
                title: "Pending",
                description: "Assignments which you have not submitted yet.",
              },
              {
                title: "Level Up",
                description: "Use feed to level up your skills.",
              },
            ]}
          />
        </div>
      </Content>
      <Footer
        className="m-3 rounded-4 bold"
        style={{ textAlign: "center", backgroundColor: "#fff" }}
      >
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default assesments;
