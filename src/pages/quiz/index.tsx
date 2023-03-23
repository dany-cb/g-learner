import { useState, useEffect } from "react";
import { Layout, Card, Breadcrumb, theme, Input, Avatar, Badge, Tag, Button } from "antd";
import { HomeFilled, BellTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { supabase } from "../../../utils/initSupabase";

const Quiz = () => {
  const { Content, Header, Footer } = Layout;
  const { Search } = Input;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("quiz").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setData(data);
      console.log(data);
    };

    fetchData();
  }, []);
  
  
  return (
    <>
      <Header
        style={{ padding: 0, background: colorBgContainer }}
        className="d-flex flex-row-reverse"
      >
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
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} className="d-flex">
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
          className="p-5 d-flex justify-content-center align-items-center"
        >
          <div className="row row-cols-3">
            
        {
          data?.map((item,i)=> {
            return (
              <Card
              
          className={`quiz-container border m-3`}
          hoverable={true}
          bordered={true}
          key={i}
          style={{width:"370px",minHeight:"300px"}}
          
        >
          <h6>{item.title}</h6>
          <hr />

          {
            item.tags.split(" ")?.map((it,j)=>{
              
              return(
                <Tag color="blue" className="rounded-pill m-1" key={j}>
                  {it}
                </Tag>
              );
            })
          }
          <p className="mt-5">Deadline Date :{item.deadline.split("T")[0]}</p>
          <p>Deadline Time :{item.deadline.split("T")[1].split("+")[0]}</p>
          <Button type="primary" block style={{paddingBottom:"30px"}} href={`/quiz/${item.id}`}>Click here</Button>

        </Card>
            );
          })
         
        } 
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Quiz;
