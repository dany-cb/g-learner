import React from "react";
import {
  Layout,
  Input,
  Breadcrumb,
  theme,
  Card,
  Col,
  Row,
  Avatar,
  Badge,
} from "antd";
import { HomeFilled, BellOutlined,CalendarOutlined} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import test from "../../../assets/images/test.png";
import { course } from "../../../assets/data/course";
import Header2 from "components/Header2";


const Courses = () => {
  const { Header, Content, Footer } = Layout;
  const { Search } = Input;
  const { names } = course;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  

  return (
    <>
      <div className="m-3 ms-5 mt-4">
        <nav className="">
          <div className="d-flex justify-content-between">
            <Breadcrumb
              style={{ minWidth: 350, backgroundColor:"#ffff" }}
              className="d-flex rounded-4 ps-4 pt-2"
            >
              <Breadcrumb.Item>
                <Link href="/courses">
                  <HomeFilled style={{fontSize:"18px"}} />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item> My Courses</Breadcrumb.Item>
            </Breadcrumb>
            <Input
              className="rounded-4 ms-4 border border-0"
              placeholder="🔍 Search here for latest feed"
              allowClear
              style={{
                width: 780,
                marginRight: 65,
                height: 43
              }}
            />
            <div className="d-flex justify-content-between" style={{marginRight:85}}>
              <Badge count={3} className="bg-light" style={{ fontSize: "13px" }}>
                <Avatar
                  className=""
                  size={45}
                  shape="square"
                  style={{ backgroundColor: "#201c1c", lineHeight:"31px" }}
                  icon={
                    <BellOutlined
                      style={{ fontSize: "20px" }}
                      className="rounded-4"
                    />
                  }
                />
              </Badge>{" "}
              <Avatar
                style={{ backgroundColor: "#201c1c", lineHeight:"31px" }}
                size={45}
                shape="square"
                className="mx-3 rounded-3"
                icon={
                  <CalendarOutlined
                    style={{ fontSize: "20px" }}
                    className="rounded-4"
                  />
                }
              />
               {" "}
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
      
      <Content style={{ margin: "10px 22px" }} className="rounded-4">
        <div
          style={{
            padding: 24,
            minHeight: 360,
            color: "black"
          }}
        >
          <Row
            gutter={[50, 30]}
            className="d-flex justify-content-start align-items-center"
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
      <Footer className="m-3 rounded-4 bold" style={{ textAlign: "center" ,backgroundColor:"#fff" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Courses;
