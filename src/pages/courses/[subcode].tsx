import React from "react";
import { Layout, Input, Breadcrumb, theme, Collapse } from "antd";
import { HomeFilled } from "@ant-design/icons";
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
          <Breadcrumb.Item>
            <Link href="/courses">My Courses</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{name}</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            color: "black",
          }}
        >
          {names.map(
            (item, i) => item.subcode === name && <p key={i}>hello world</p>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Subcode;
