import React from "react";
import Link from "next/link";
import { Layout, Collapse, Divider, Breadcrumb, theme } from "antd";
import { HomeFilled } from "@ant-design/icons";

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;

const Ongoing = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }} />
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
          <Breadcrumb.Item>Ongoing</Breadcrumb.Item>
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
            <Panel header="This is default size panel header" key="1">
              <p>Sadddddd</p>
            </Panel>
            <Panel header="This is default size panel header" key="2">
              <p>Sadddddd</p>
            </Panel>
            <Panel header="This is default size panel header" key="3">
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

export default Ongoing;
