import { useState, useEffect } from "react";
import { Layout, Card, Popover, Button } from "antd";
import { AiOutlineDownCircle } from "react-icons/ai";
import { RiCake2Line } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Avatar from "components/Avatar";

const { Header } = Layout;

const Profile = () => {
  const supabase = useSupabaseClient<any>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [full_name, setFullName] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, full_name, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFullName(data.full_name);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
  }: {
    username: String;
    full_name: String;
    website: String;
    avatar_url: String;
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        full_name,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <main>
      <Head>
        <title>G-Learner | Profile</title>
        <meta name="description" content="AI powered LMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
        className="d-flex justify-content-between align-items-center p-3"
      >
        <h2 className="w-25 m-0">G-Learner</h2>

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "30%" }}
        >
          <Link href="/hub" className="text-reset text-decoration-none">
            <h5 className="m-0">Feed</h5>
          </Link>
          <Link href="/learn" className="text-reset text-decoration-none">
            <h5 className="m-0">Courses</h5>
          </Link>
          <Link href="/quiz" className="text-reset text-decoration-none">
            <h5 className="m-0">Quiz</h5>
          </Link>
          <Link href="/leaderboard" className="text-reset text-decoration-none">
            <h5 className="m-0">Leaderboard</h5>
          </Link>
          <div className="text-reset">
            {!user ? (
              <Button className="btn-grad border-0 btn-sm rounded">
                <h6 className="m-0">Login</h6>
              </Button>
            ) : (
              <Popover
                content={content}
                placement="bottomRight"
                title="Title"
                trigger="click"
              >
                <Button className="btn-grad border-0 btn-sm rounded-circle p-3 btn-profile">
                  <h6 className="m-0">JD</h6>
                </Button>
              </Popover>
            )}
          </div>
        </div>
      </Header>
      <section className="dot-pattern vh-50 d-flex justify-content-center align-items-center">
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-1 bold text-center gradient-text">Profile</h1>
          <h4 className="mb-4">
            Build your professional identity and showcase your learning
            achievements with us.
          </h4>
        </div>
      </section>
      <section className="container mt-3 d-flex justify-content-center align-items-center">
        <Card
          style={{ width: "30rem" }}
          className="shadow border-0 py-2 my-3 text-center"
        >
          <Avatar
            uid={user?.id!}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({
                username,
                full_name,
                website,
                avatar_url: url,
              });
            }}
          />
          <h2 className="gradient-text mt-4">
            {full_name ? full_name : "John Doe"}
          </h2>
          <p>
            I{`'`}m an aspiring web developer and I{`'`}m currently learning
            ReactJS. I{`'`}m also a huge fan of anime and I love to play video
            games.
          </p>
          <Button className="btn-grad border-0 px-3 shadow">
            <RiCake2Line className="mb-1 me-2" />
            Birthday: 1-1-2000
          </Button>
          <Button className="btn-grad border-0 px-3 shadow mt-3">
            <FiBookOpen className="mb-1 me-2" />
            Currently: Working as a Web Developer
          </Button>
        </Card>
      </section>
      <section className="container mt-5">
        <hr />
        <h3 className="mt-4">Your Resources</h3>
        <div className="row">
          <div className="col-md-4">
            <Card className="shadow border-0 py-2 my-3 text-center">
              <h2 className="gradient-text">HTML</h2>
              <p>React is a JavaScript library for building user interfaces.</p>
              <Button className="btn-grad border-0 px-3 shadow">
                <AiOutlineDownCircle className="mb-1 me-2" />
                Download
              </Button>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow border-0 py-2 my-3 text-center">
              <h2 className="gradient-text">CSS</h2>
              <p>React is a JavaScript library for building user interfaces.</p>
              <Button className="btn-grad border-0 px-3 shadow">
                <AiOutlineDownCircle className="mb-1 me-2" />
                Download
              </Button>
            </Card>
          </div>
          <div className="col-md-4 d-flex justify-content-between align-items-center">
            <BsArrowRightCircle className="me-2" size="30px" />
            <h3 className="mb-0">Videos</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <Card className="shadow border-0 py-2 my-3 text-center">
              <h2 className="gradient-text">How to learn?</h2>
              <p>A guide to learning how to learn.</p>
              <Button className="btn-grad border-0 px-3 shadow">
                <AiOutlineDownCircle className="mb-1 me-2" />
                Show
              </Button>
            </Card>
          </div>
          <div className="col-md-4">
            <Card className="shadow border-0 py-2 my-3 text-center">
              <h2 className="gradient-text">Architecture</h2>
              <p>The architecture is a set of structures needed for system.</p>
              <Button className="btn-grad border-0 px-3 shadow">
                <AiOutlineDownCircle className="mb-1 me-2" />
                Show
              </Button>
            </Card>
          </div>
          <div className="col-md-4 d-flex justify-content-between align-items-center">
            <BsArrowRightCircle className="me-2" size="30px" />
            <h3 className="mb-0">Blogs</h3>
          </div>
        </div>
      </section>
    </main>
  );
};

Profile.noBaseLayout = true;

export default Profile;
