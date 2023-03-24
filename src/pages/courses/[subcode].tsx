import React, { useState } from "react";
import {
  Layout,
  Input,
  Breadcrumb,
  theme,
  Collapse,
  Badge,
  Avatar,
} from "antd";
import {
  HomeFilled,
  FileFilled,
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { course } from "../../../assets/data/course";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import { TbMedal2, TbMilitaryAward } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";
import { FaRegUserCircle } from "react-icons/fa";
import { Button, Tooltip } from "antd";
import ReactPlayer from "react-player";

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
  const [isFav, setIsFav] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "receiver",
      text: "Hi, how are you?",
      sentTime: "10:23 AM",
    },
    {
      id: 2,
      sender: "sender",
      text: "I'm good, thanks. How about you?",
      sentTime: "10:24 AM",
    },
    {
      id: 3,
      sender: "receiver",
      text: "I'm doing well too, thanks.",
      sentTime: "10:25 AM",
    },
  ]);

  const handleMessageSubmit = (event) => {
    // Handle submission of new message
  };

  return (
    <>
      <div className="m-3 ms-5 mt-4">
        <nav className="">
          <div className="d-flex justify-content-between">
            <Breadcrumb
              style={{ minWidth: 350, backgroundColor: "#ffff" }}
              className="d-flex rounded-4 ps-4 pt-2"
            >
              <Breadcrumb.Item>
                <Link href="/courses">
                  <HomeFilled style={{ fontSize: "18px" }} />
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
                height: 43,
              }}
            />
            <div
              className="d-flex justify-content-between"
              style={{ marginRight: 85 }}
            >
              <Badge
                count={3}
                className="bg-light"
                style={{ fontSize: "13px" }}
              >
                <Avatar
                  className=""
                  size={45}
                  shape="square"
                  style={{ backgroundColor: "#201c1c", lineHeight: "31px" }}
                  icon={
                    <BellOutlined
                      style={{ fontSize: "20px" }}
                      className="rounded-4"
                    />
                  }
                />
              </Badge>{" "}
              <Avatar
                style={{ backgroundColor: "#201c1c", lineHeight: "31px" }}
                size={45}
                shape="square"
                className="mx-3 rounded-3"
                icon={
                  <CalendarOutlined
                    style={{ fontSize: "20px" }}
                    className="rounded-4"
                  />
                }
              />{" "}
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

      {/* <Content style={{ margin: "0 16px" }}>
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
      </Content> */}
      <section className="px-3 d-flex justify-content-between align-items-start">
        <div className="card rounded-4 border-0 container px-3 py-4 col-5 m-0">
          <h6 className="text-muted">CS8091</h6>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Computer Architecture</h3>
            <Tooltip title="bookmark">
              <Button
                shape="circle"
                size="large"
                className="mb-2"
                onClick={() => setIsFav(!isFav)}
                icon={
                  isFav ? (
                    <BsBookmarkHeartFill size="1.3rem" className="pb-1" />
                  ) : (
                    <BsBookmarkHeart size="1.3rem" className="pb-1" />
                  )
                }
              />
            </Tooltip>
          </div>
          <p className="mt-2">
            Computer architecture is a set of rules and methods that describe
            the functionality, organization, and implementation of computer
            systems. Some authors add computer organization to the term, as
            architecture defines the capabilities and programming model of a
            computer, but not a particular implementation; organization defines
            the physical implementation of the architecture.
          </p>
          <div>
            <h5 className="mt-4 text-muted">Course Achievements</h5>
            <div className="d-flex justify-content-between align-items-center">
              <div className="card border-0 bg-gray col-3">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                  <TbMedal2 size="1.5rem" />
                  <div className="card-text">
                    <h6 className="mb-0 mt-3">1200</h6> points
                  </div>
                </div>
              </div>
              <div className="card border-0 bg-gray col-5">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                  <GiProgression size="1.5rem" />
                  <div className="card-text">
                    <h6 className="mb-0 mt-3">45.3%</h6> complete
                  </div>
                </div>
              </div>
              <div className="card border-0 bg-gray col-3">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                  <TbMilitaryAward size="1.5rem" />
                  <div className="card-text">
                    <h6 className="mb-0 mt-3">+26</h6> level up
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h5 className="text-muted">Course Details</h5>
            <div>
              <div className="card border-0 bg-gray">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <div
                    className="card col-2 d-flex justify-content-center align-items-center"
                    style={{ width: "4rem", height: "4rem" }}
                  >
                    <h6 className="mb-0">1</h6>
                  </div>
                  <div className="col-10 ms-3">
                    <h6>Introduction</h6>
                    <div>
                      <TfiAlarmClock className="mb-1" />
                      <span className="ms-2 mb-0">3 min, 25 sec</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border-0 bg-gray mt-2">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <div
                    className="card col-2 d-flex justify-content-center align-items-center"
                    style={{ width: "4rem", height: "4rem" }}
                  >
                    <h6 className="mb-0">2</h6>
                  </div>
                  <div className="col-10 ms-3">
                    <h6>Getting Started</h6>
                    <div>
                      <TfiAlarmClock className="mb-1" />
                      <span className="ms-2 mb-0">5 min, 40 sec</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border-0 bg-gray mt-2">
                <div className="card-body d-flex justify-content-center align-items-center">
                  <div
                    className="card col-2 d-flex justify-content-center align-items-center"
                    style={{ width: "4rem", height: "4rem" }}
                  >
                    <h6 className="mb-0">3</h6>
                  </div>
                  <div className="col-10 ms-3">
                    <h6>The Illustration</h6>
                    <div>
                      <TfiAlarmClock className="mb-1" />
                      <span className="ms-2 mb-0">1 min, 12 sec</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container col-7 ms-3">
          <div
            className="card border-0 rounded-4 d-flex justify-content-center align-items-center"
            style={{
              height: "24.3rem",
            }}
          >
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              style={{ padding: "0 1rem 0 1rem" }}
            />
          </div>
          <div
            className="card border-0 rounded-4 d-flex justify-content-start align-items-center mt-3 p-3"
            style={{
              height: "25rem",
            }}
          >
            <h5 className="text-muted">Quick Chat</h5>
            <div className="card chat-container container border-0 rounded-4 w-100 h-100 overflow-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender}`}
                >
                  <Avatar
                    size="small"
                    className="bg-gray me-2"
                    icon={<FaRegUserCircle className="mb-1 text-dark" />}
                  />
                  <div>
                    <p>{message.text}</p>
                    <span className="sent-time">{message.sentTime}</span>
                  </div>
                </div>
              ))}
              <div className="input-container">
                <input type="text" placeholder="Type a message" />
                <button onClick={handleMessageSubmit}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer
        className="m-3 rounded-4 bold"
        style={{ textAlign: "center", backgroundColor: "#fff", bottom: 0 }}
      >
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Subcode;
