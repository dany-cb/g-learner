import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Roboto } from "@next/font/google";
import { Layout, Menu, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Link from "next/link";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

Home.noBaseLayout = true;

const { Header } = Layout;

export default function Home() {
  return (
    <>
      <Head>
        <title>G-LEARNER</title>
        <meta name="description" content="AI powered LMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header
          style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
          className="d-flex justify-content-between align-items-center p-3"
        >
          <h2 className="w-25">G-Learner</h2>

          <div className="w-25 d-flex justify-content-between align-items-center">
            <Link href="/hub" className="text-reset text-decoration-none">
              <h5 className="m-0">Hub</h5>
            </Link>
            <Link href="/learn" className="text-reset text-decoration-none">
              <h5 className="m-0">Learn</h5>
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
            {/* <div href="#memes" className="text-reset">
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
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <Button className="btn-grad border-0 btn-sm rounded-circle p-3 btn-profile mb-2">
                    <h6 className="m-0">A</h6>
                  </Button>
                </OverlayTrigger>
              )}
            </div> */}
          </div>
        </Header>
        {/* <section className="dot-pattern">
          <div className="container vh-75 d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-1 bold text-center gradient-text">
              Learn, Share, and Engage.
            </h1>
            <h4 className="mt-3 mb-4">
              Where Learning Meets Social – Elevate Your Education Online
            </h4>
            <div>
              <Button
                className="btn-grad border-0 px-3 fs-5 shadow"
                href="/home"
              >
                Get Started!
              </Button>
              <Button className="ms-4 px-3 fs-5 btn-grey text-dark border-0 shadow">
                <GithubOutlined className="mb-1 me-2" />
                Github
              </Button>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}
