import { Layout, Breadcrumb, Card, theme, Input, Tag, Space } from "antd";
import {
  HomeFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import BaseLayout from "components/BaseLayout";
import Link from "next/link";
import Image from "next/image";

const Feed = () => {
  const { Content, Header, Footer } = Layout;
  const { Search } = Input;
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
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link href="/feed">
                <HomeFilled className="d-flex p-0 justify-content-center align-items-center" />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Feed</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              color: "black",
            }}
            className="container d-flex flex-column justify-content-center align-items-center py-5"
          >
            {[1, 2, 3, 4, 5, 6].map((item, i) => (
              <Card
                style={{ width: "90%" }}
                className="border my-3"
                hoverable={true}
                bordered={true}
                key={i}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <Image
                    width={300}
                    height={200}
                    className="rounded col-4 shadow-sm"
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                  <div className="col-8 ms-3">
                    <div className="my-3">
                      <Tag color="magenta" className="rounded-pill">
                        magenta
                      </Tag>
                      <Tag color="red" className="rounded-pill">
                        red
                      </Tag>
                      <Tag color="volcano" className="rounded-pill">
                        volcano
                      </Tag>
                      <Tag color="cyan" className="rounded-pill">
                        cyan
                      </Tag>
                      <Tag color="blue" className="rounded-pill">
                        blue
                      </Tag>
                      <Tag color="geekblue" className="rounded-pill">
                        geekblue
                      </Tag>
                      <Tag color="purple" className="rounded-pill">
                        purple
                      </Tag>
                    </div>
                    <h6 className="fw-bold">
                      Bresenham Circle Drawing Algorithm Part-1 Explained with
                      Solved Example in Hindi l Computer Graphics
                    </h6>
                    <p className="text-muted">
                      https://www.youtube.com/watch?v=VdCQWBv0fMg
                    </p>
                    <Space size={[0, 8]} wrap>
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Useful
                      </Tag>
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Not Useful
                      </Tag>
                    </Space>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          G-learner ©2023 Created by Scuderia
        </Footer>
      </Layout>
      </>
  );
};

export default Feed;
