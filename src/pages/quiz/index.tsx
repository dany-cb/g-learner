import { Layout, Breadcrumb, theme, Input } from "antd";
import { HomeFilled } from "@ant-design/icons";
import Link from "next/link";
import BaseLayout from "components/BaseLayout";
const Quiz = () => {
  const { Content, Header, Footer } = Layout;
  const { Search } = Input;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

  return (
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
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link href="/quiz">
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
        <Footer style={{ textAlign: "center" }}>
          G-learner ©2023 Created by Scuderia
        </Footer>
      </Layout>
    </BaseLayout>
  );
};

export default Quiz;
