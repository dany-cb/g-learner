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
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import BookDetails from "components/books";
import { getFeedNew, getFeed, getArticles } from "utils/services";

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
    const fetchNewFeed = async () => {
      const response = await getFeedNew(tags.join(" "));
      console.log(response);
    }
    fetchFeed();
    fetchNewFeed();
  }, [tags])
  

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
              <Breadcrumb.Item>Feed</Breadcrumb.Item>
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
    
        <Content style={{ margin: "10px 22px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              color: "black",
            }}
            className="d-flex flex-column justify-content-center align-items-center py-5"
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
          <section className="container mt-3">
          <h3>Books Library</h3>
          <div className="d-flex row justify-content-center">
            <BookDetails />
          </div>
        </section>
        </Content>
        <Footer className="m-3 rounded-4 bold" style={{ textAlign: "center" ,backgroundColor:"#fff" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
     
    </>
  );
};

export default Feed;
