import { Layout, Breadcrumb, theme } from "antd";
import { HomeFilled } from "@ant-design/icons";
import Link from "next/link";

export default function Quiz() {
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
        <Breadcrumb.Item>Quiz</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          color: "black",
        }}
      >
        <h1>This is Quiz page</h1>
      </div>
    </Content>
  );
}
