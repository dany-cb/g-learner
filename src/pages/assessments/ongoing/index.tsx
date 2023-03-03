import React,{useEffect,useState} from "react";
import Link from "next/link";
import {
  Layout,
  Collapse,
  Divider,
  Breadcrumb,
  theme,
  Badge,
  Avatar,
} from "antd";
import { HomeFilled, BellTwoTone } from "@ant-design/icons";
import { supabase } from "../../../../utils/initSupabase";

const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;

const Ongoing = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState([]);
  const [ass, setAss]=useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("assignments").select("subcode");
      const ndata=[];
      const unique = data.filter(element=>{
        const isDuplicate = ndata.includes(element.subcode);
        if(!isDuplicate){
          ndata.push(element.subcode);
          return true;
        }
        return false;
      })
      if (error) {
        console.error(error);
        return;
      }
      setData(ndata);
      console.log(ndata);
    };

    fetchData();
  }, []);      
      useEffect(()=>{
        data.forEach((item,i)=>{
          const fetchData = async() => {
            const { data,error }= await supabase.from("assignments").select("*").eq("subcode",item);
            if (error) {
              console.error(error);
              return;
            }
            setAss(data);
            console.log(ass);
          };
          fetchData();
          
        })
      }, [data])
  
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
            <Link href="/courses">
              <HomeFilled style={{ paddingLeft: 5 }} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/assessments">Assessments</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Ongoing</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            color: "black",
          }}
        >
         <>
         {
          ass.map((item,i)=>{
            <p key={i}>{item.title}</p>
          })
         }
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
      <Footer style={{ textAlign: "center" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Ongoing;
