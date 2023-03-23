import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layout,
  Collapse,
  Divider,
  Breadcrumb,
  theme,
  Badge,
  Avatar,
  Input,
} from "antd";
import {
  HomeFilled,
  BellTwoTone,
  BellOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { supabase } from "../../../../utils/initSupabase";

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;

const Ongoing = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [ass, setAss] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("assignments")
        .select("subcode");
      const ndata = [];
      const unique = data.filter((element) => {
        const isDuplicate = ndata.includes(element.subcode);
        if (!isDuplicate) {
          ndata.push(element.subcode);
          return true;
        }
        return false;
      });
      if (error) {
        console.error(error);
        return;
      }
      setData(ndata);
      console.log(ndata);
    };

    fetchData();
  }, []);
  useEffect(() => {
    data.forEach((item, i) => {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("assignments")
          .select("*")
          .eq("subcode", item);
        if (error) {
          console.error(error);
          return;
        }
        setAss(data);
        console.log(ass);
      };
      fetchData();
    });
  }, [data]);

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
                <Link href="/assessments">Assessments</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Ongoing</Breadcrumb.Item>
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
      
      <Content style={{ margin: "0 16px" }}>
        
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            color: "black",
          }}
        >
          <>
            {ass.map((item, i) => {
              <p key={i}>{item.title}</p>;
            })}
            <Divider orientation="left">
              <h4 className="mb-0">CS8425 Computer Architecture</h4>
            </Divider>
            <Collapse bordered={false}>
              <Panel header="unit 1 Journal Assignment" key="1">
                <p>Sadddddd</p>
              </Panel>
              <Panel header="Unit 2 group acitivity" key="2">
                <p>Sadddddd</p>
              </Panel>
              <Panel header="Unit 2 quiz" key="3">
                <p>Sadddddd</p>
              </Panel>
            </Collapse>
          </>
        </div>
      </Content>
      <Footer
        className="m-3 rounded-4 bold"
        style={{ textAlign: "center", backgroundColor: "#fff" }}
      >
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Ongoing;
