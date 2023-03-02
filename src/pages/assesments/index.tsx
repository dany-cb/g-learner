import React from "react";
import { Collapse, Divider } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const { Panel } = Collapse;

const Assesments = () => {
  return (
    <>
      <section className="container my-5">
        <Divider orientation="left">
          <h4 className="mb-0">CS8425 Computer Architecture</h4>
        </Divider>
        <Collapse bordered={false}>
          <Panel header="This is default size panel header" key="1">
            <p>Sadddddd</p>
          </Panel>

          <Panel
            header="This is default size panel header"
            key="2"
            className=""
          >
            <p>Sadddddd</p>
          </Panel>
          <Panel header="This is default size panel header" key="3">
            <p>Sadddddd</p>
          </Panel>
        </Collapse>
      </section>
    </>
  );
};

export default Assesments;
