import { Breadcrumb, Avatar, Badge, Input } from "antd";
import { HomeFilled, BellOutlined, CalendarOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const Header2 = () => {
  const onSearch = (value: string) => console.log(value);
  const { Search } = Input;
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
              <Breadcrumb.Item> My Courses</Breadcrumb.Item>
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
    </>
  );
};

export default Header2;
