import React from "react";
import { Layout, Input, Breadcrumb, theme, Card, Col, Row } from "antd";
import { HomeFilled } from "@ant-design/icons";
import BaseLayout from "components/BaseLayout";
import Link from "next/link";
import Image from "next/image";
import test from "../../../assets/images/test.png";

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
            <Row
              gutter={[50, 30]}
              className="d-flex justify-content-center align-items-center"
            >
              {[1, 2, 3, 4, 5, 6].map((item, i) => (
                <Col key={i}>
                  <Link
                    href={`/courses/${nice}`}
                    className="text-decoration-none"
                  >
                    <Card
                      className="border"
                      cover={<Image alt="example" priority src={test} />}
                      hoverable={true}
                      title="CS8491"
                      bordered={true}
                    >
                      <div className="text-center">
                        <h6>Computer Architecture</h6>
                        <p className="mb-0">Semester IV</p>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
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
