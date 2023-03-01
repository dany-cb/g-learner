import React from "react";
import { Layout, Input, Breadcrumb, theme, Card, Col, Row } from "antd";
import { HomeFilled } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import test from "../../../assets/images/test.png";
import { course } from "../../../assets/data/course";

const Courses = () => {
  const { Header, Content, Footer } = Layout;
  const { Search } = Input;
  const { names } = course;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

  return (
    <>
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
            {names.map((item, i) => (
              <Col key={i}>
                <Link
                  href={`/courses/${item.subcode}`}
                  className="text-decoration-none"
                >
                  <Card
                    className="border"
                    style={{ width: 300 }}
                    cover={<Image alt="example" src={test} priority />}
                    hoverable={true}
                    title={item.subcode}
                    bordered={true}
                  >
                    <div className="text-center">
                      <h6>{item.title}</h6>
                      <p className="mb-0">Semester {item.semester}</p>
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
    </>
  );
};

export default Courses;
