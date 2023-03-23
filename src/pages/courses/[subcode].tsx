import React from "react";
import { Layout, Input, Breadcrumb, theme, Collapse,Badge,Avatar } from "antd";
import { HomeFilled, FileFilled, BellOutlined, CalendarOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { course } from "../../../assets/data/course";

const Subcode = () => {
  const { Header, Content, Footer } = Layout;
  const { Search } = Input;
  const { Panel } = Collapse;
  const { names } = course;
  const router = useRouter();
  let name = router.asPath.split("/")[2];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

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
              <Breadcrumb.Item> 
               <Link href="/courses">My Courses</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{name}</Breadcrumb.Item>
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

      <Content style={{ margin: "0 16px" }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            color: "black",
          }}
        >
          {names?.map(
            (item, i) =>
              item.subcode === name &&
              item.material?.map((items, j) => {
                return (
                  <Collapse accordion key={i + j} expandIconPosition={"end"}>
                    <Panel header={items.title} key={j} className="mb-2">
                      {items.links?.map((it, k) => {
                        return (
                          <div key={k} className="d-flex">
                            <p className="me-3">{it.title}</p>
                            <p>
                              <Link href={it.link}>
                                <FileFilled />
                              </Link>
                            </p>
                          </div>
                        );
                      })}
                    </Panel>
                  </Collapse>
                );
              })
          )}
        </div>
      </Content>
      <Footer className="m-3 rounded-4 bold" style={{ textAlign: "center" ,backgroundColor:"#fff", bottom:0 }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Subcode;
