import React from "react";
import { Layout, Input, Breadcrumb, theme, Card, Col, Row } from "antd";
import { HomeFilled } from "@ant-design/icons";
import BaseLayout from "components/BaseLayout";
import Link from "next/link";
import Image from "next/image";

const Courses = () => {
  const { Header, Content, Footer } = Layout;
  const { Search } = Input;

  let nice = "Computer Architecture";

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

  return (
    <>
      <BaseLayout>
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
          <Breadcrumb style={{ margin: "16px 0" }} className="d-flex">
            <Breadcrumb.Item>
              <Link href="/courses">
                <HomeFilled style={{ paddingLeft: 5 }} />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item> My Courses</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              color: "black",
            }}
          >
            <Row gutter={[8, 16]}>
              <Col span={8}>
                <Link href={`/courses/${nice}`}>
                  <Card
                    style={{ width: 300 }}
                    cover={
                      <Image
                        width={300}
                        height={200}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    hoverable={true}
                    title="Card title"
                    bordered={true}
                  >
                    Computer Architecture
                  </Card>
                </Link>
              </Col>
              <Col span={8}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <Image
                      width={300}
                      height={200}
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  hoverable={true}
                  title="Card title"
                  bordered={true}
                >
                  Computer Architecture
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <Image
                      width={300}
                      height={200}
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  hoverable={true}
                  title="Card title"
                  bordered={true}
                >
                  Computer Architecture
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <Image
                      width={300}
                      height={200}
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  hoverable={true}
                  title="Card title"
                  bordered={true}
                >
                  Computer Architecture
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          G-learner ©2023 Created by Scuderia
        </Footer>
      </BaseLayout>
    </>
  );
};

export default Courses;
