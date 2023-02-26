import React from "react";
import Sidebar from "components/student/sidebar";
import Footer from "components/Footer";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Sidebar>
        <div className="">{children}</div>
      </Sidebar>
      {/* <Footer /> */}
    </>
  );
};

export default BaseLayout;
