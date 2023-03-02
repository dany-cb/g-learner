import { useEffect, useState } from "react";
import Head from "next/head";
import { Layout, Button, Popover } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Link from "next/link";

Home.noBaseLayout = true;

const { Header } = Layout;

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(false);
  const [initial, setInitial] = useState("");

  const checkUser = () => {
    const person = JSON.parse(localStorage.getItem("user"));
    if (person !== null) {
      setInitial(person.username);
      setUser(true);
      return true;
    } else {
      return false;
    }
  };

  const content = (
    <div className="text-center">
      <Button
        className="btn-grad border-0 btn-sm rounded mb-2"
        onClick={() => {
          window.location.href = "/profile";
        }}
      >
        <p className="m-0">View Profile</p>
      </Button>
      <Button
        className="btn-grad border-0 btn-sm rounded"
        onClick={() => {
          // remove from local storage
          localStorage.removeItem("user");
          // push to login page
          window.location.href = "/";
        }}
      >
        <p className="m-0">Logout?</p>
      </Button>
    </div>
  );

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Head>
        <title>G-Learner | AI Powered LMS</title>
        <meta name="description" content="AI powered LMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header
          style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
          className="d-flex justify-content-between align-items-center p-3"
        >
          <h2 className="w-25 m-0">G-Learner</h2>

          <div className="w-25 d-flex justify-content-between align-items-center">
            <Link href="/hub" className="text-reset text-decoration-none">
              <h5 className="m-0">Feed</h5>
            </Link>
            <Link href="/learn" className="text-reset text-decoration-none">
              <h5 className="m-0">Courses</h5>
            </Link>
            <Link href="/quiz" className="text-reset text-decoration-none">
              <h5 className="m-0">Quiz</h5>
            </Link>
            <Link
              href="/leaderboard"
              className="text-reset text-decoration-none"
            >
              <h5 className="m-0">Leaderboard</h5>
            </Link>
            <div className="text-reset">
              {!user ? (
                <Button
                  className="btn-grad border-0 btn-sm rounded mb-2"
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  <h6 className="m-0">Login</h6>
                </Button>
              ) : (
                <Popover
                  content={content}
                  placement="bottomRight"
                  title="Title"
                  trigger="click"
                >
                  <Button className="btn-grad border-0 btn-sm rounded-circle p-3 btn-profile mb-2">
                    <h6 className="m-0">A</h6>
                  </Button>
                </Popover>
              )}
            </div>
          </div>
        </Header>

        <section className="dot-pattern">
          <div className="container vh-75 d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-1 bold text-center gradient-text">
              Intelligent, Personalized, Efficient Learning.
            </h1>
            <h4 className="mt-3 mb-4">
              Empower your learning with our futuristic AI-powered LMS!
            </h4>
            <div>
              <Button
                className="btn-grad border-0 px-3 shadow"
                href="/home"
                size="large"
              >
                Get Started!
              </Button>
              <Button
                className="ms-4 px-3 btn-grey text-dark border-0 shadow"
                href="/"
                size="large"
              >
                <GithubOutlined className="me-2 pb-n5" />
                Github
              </Button>
            </div>
          </div>
        </section>
        <section className="container">
          <hr />
        </section>
      </main>
    </>
  );
}
