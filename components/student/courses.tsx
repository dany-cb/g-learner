import Link from "next/link";
import { Layout, Breadcrumb, theme, Card, Col, Row, Space } from "antd";
import { HomeFilled } from "@ant-design/icons";

export default function Courses() {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link href="/student">
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
            <Card
              style={{ width: 300 }}
              cover={
                <img
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
                <img
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
                <img
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
                <img
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
  );
}
