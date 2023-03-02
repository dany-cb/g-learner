import React from "react";
import Link from "next/link";
import {
  Layout,
  Collapse,
  Divider,
  Breadcrumb,
  theme,
  Badge,
  Avatar,
} from "antd";
import { HomeFilled, BellTwoTone } from "@ant-design/icons";

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;

const Completed = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          <Breadcrumb.Item>
            <Link href="/assessments">Assessments</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Completed</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            color: "black",
          }}
        >
          <Divider orientation="left">
            <h4 className="mb-0">CS8425 Computer Architecture</h4>
          </Divider>
          <Collapse bordered={false}>
            <Panel header="unit 3 Journal Assignment" key="1">
              <p>Sadddddd</p>
            </Panel>
            <Panel header="Unit 3 group acitivity" key="2">
              <p>Sadddddd</p>
            </Panel>
            <Panel header="Unit 3 quiz" key="3">
              <p>Sadddddd</p>
            </Panel>
          </Collapse>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Completed;
