import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Layout, Steps, theme, Breadcrumb, Badge, Avatar } from "antd";
import { HomeFilled, BellTwoTone } from "@ant-design/icons";

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
      <Header
        style={{ padding: 0, background: colorBgContainer }}
        className="d-flex flex-row-reverse"
      >
        <div>
          <Badge count={3} className="me-3" style={{ fontSize: "13px" }}>
            <Avatar
              size={35}
              shape="circle"
              style={{ backgroundColor: "white" }}
              icon={
                <BellTwoTone style={{ fontSize: "22px" }} className="mb-3" />
              }
            />
          </Badge>{" "}
          <Avatar
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            size={35}
            className="me-5"
          >
            U
          </Avatar>
        </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} className="d-flex">
          <Breadcrumb.Item>
            <Link href="/courses">
              <HomeFilled style={{ paddingLeft: 5 }} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Assessments</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: "75vh",
            background: colorBgContainer,
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
      <Footer style={{ textAlign: "center" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default assesments;
