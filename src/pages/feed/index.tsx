import { useState, useEffect } from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  theme,
  Input,
  Tag,
  Space,
  Badge,
  Avatar,
  Skeleton,
  List,
  notification
} from "antd";
import {
  HomeFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BellTwoTone,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import test from "../../../assets/images/test.png";
import { getFeed, getArticles } from "utils/services";

const Feed = () => {
  const { Content, Header, Footer } = Layout;
  const { Search } = Input;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => {
    setTags(value.split(" "));
  };

  const [feed, setFeed] = useState([]);
  const [tags, setTags] = useState([
    "computer", "networks", "security", "cryptography",
  ]);
  const [loading, setLoading] = useState(true);

  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
  
  useEffect(() => {
    setLoading(true);
    const fetchFeed = async () => {
      const response = await getFeed(tags.join(" "));
      console.log(response);
      setFeed(response.data);
      setLoading(false);
    }
    const fetchArticles = async () => {
      const response = await getArticles("computer networks security cryptography");
      console.log(response);
      setFeed([...feed, ...response.data])
    }
    // fetchArticles();
    fetchFeed();
  }, [tags])
  

  return (
    <>
      <Header
        style={{ padding: 0, background: colorBgContainer }}
        className="d-flex justify-content-between"
      >
        <Search
          placeholder={tags.join(" ")}
          allowClear
          onSearch={onSearch}
          style={{
            width: 450,
            height: 150,
            marginTop: 20,
            marginLeft: 50,
          }}
        />
        <div>
          <Badge count={3} className="me-3" style={{ fontSize: "13px" }}>
            <Avatar
              size={35}
              shape="circle"
              style={{ backgroundColor: "white" }}
              icon={
                <BellTwoTone style={{ fontSize: "22px" }} className="mb-3" />
              }
            />
          </Badge>{" "}
          <Avatar
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            size={35}
            className="me-5"
          >
            U
          </Avatar>
        </div>
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
            {!loading && feed && feed?.map((item, i) => (
              <Card
                style={{ width: "90%" }}
                className="border my-3"
                hoverable={true}
                bordered={true}
                key={i}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <Image
                    className="rounded shadow-sm"
                    alt="example"
                    width={300}
                    height={200}
                    priority
                    src={`https://img.youtube.com/vi/${youtube_parser(item.link)}/hqdefault.jpg`}
                  />
                  <div className="col-8 ms-3">
                    <div className="my-3">
                      {tags.map((tag, i) => (
                        <Tag key={i} color="blue">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    <a href={item.link} >
                    <h6 className="fw-bold" >
                      {item.title}
                    </h6>
                    </a>
                    <p className="text-muted">
                      {item.link}
                    </p>
                    <Space size={[0, 8]} wrap>
                      <Tag icon={<CheckCircleOutlined />} color="success" onClick={()=>{
                        notification.open({
                          placement: 'bottomRight',
                          message: 'Yaay!',
                          description:
                            'More related content will be shown to you.',
                        })
                      }}>
                        Useful
                      </Tag>
                      <Tag icon={<CloseCircleOutlined />} color="error" onClick={()=>{
                        setFeed(feed.filter((_, index) => index !== i));
                        notification.open({
                          placement: 'bottomRight',
                          message: 'Oops!',
                          description:
                            'Less related content will be shown to you.',
                        })
                      }}>
                        Not Useful
                      </Tag>
                    </Space>
                  </div>
                </div>
              </Card>
            ))}
            {loading && [1, 2, 3].map((item, i) => (
              <Skeleton loading={loading} key={i} active avatar className="mt-5" />
            ))
            }
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
