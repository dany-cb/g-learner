import { useState, useEffect } from "react";
import { Card, Button, Input, notification } from "antd";
import { AiOutlineDownCircle } from "react-icons/ai";
import { RiCake2Line } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { BsArrowRightCircle } from "react-icons/bs";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Avatar from "components/Avatar";
import { supabase } from "utils/initSupabase";
import { useRouter } from "next/router";
import { BiEdit } from "react-icons/bi";
import Header from "components/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Profile = () => {
  const user = useUser();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [full_name, setFullName] = useState<string>("");
  const [avatar_url, setAvatarUrl] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getProfile();
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNotification = (message, description) => {
    notification.open({
      message: message,
      description: description,
      duration: 3,
      placement: "bottomRight",
    });
  };

  async function getProfile() {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, full_name, website, avatar_url, bio`)
      .eq("id", user.id)
      .single();

    if (data) {
      setUsername(data.username);
      setFullName(data.full_name);
      setWebsite(data.website);
      setBio(data.bio);
      setAvatarUrl(data.avatar_url);
      console.log(data);
    } else if (error && status !== 406) {
      console.log("No profile found");
    }
  }

  async function updateProfile({
    username,
    full_name,
    website,
    bio,
    avatar_url,
  }: {
    username: String;
    full_name: String;
    website: String;
    bio: String;
    avatar_url: String;
  }) {
    const updates = {
      id: user.id,
      username,
      full_name,
      website,
      bio,
      avatar_url,
      updated_at: new Date().toISOString(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);
    if (error) {
      console.log("Error updating profile", error);
    } else {
      handleClick();
    }
  }

  const handleClick = () => {
    openNotification("Cool.", "Successfully updated your profile!");
  };

  return (
    <main>
      <Head>
        <title>G-Learner | Profile</title>
        <meta name="description" content="AI powered LMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
          {!edit ? (
            <div className="position-relative">
              <Avatar uid={user?.id!} url={avatar_url} size={150} />
              <Button
                className="btn-sm rounded-circle px-2 py-1 shadow-sm position-absolute top-0 end-0"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <BiEdit className="edit-icon" />
              </Button>

              <h2 className="gradient-text mt-4 text-capitalize">
                {full_name ? full_name : "John Doe"}
              </h2>
              <p>
                {bio
                  ? bio
                  : "I'm an aspiring web developer and I'm currently learning ReactJS. I'm also a huge fan of anime and I love to play video games."}
              </p>
              <Button className="btn-grad border-0 px-3 shadow">
                <RiCake2Line className="mb-1 me-2" />
                Birthday: 1-1-2000
              </Button>
              <Button className="btn-grad border-0 px-3 shadow mt-3">
                <FiBookOpen className="mb-1 me-2" />
                Currently: Working as a Web Developer
              </Button>
            </div>
          ) : (
            <div className="position-relative">
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
                    bio,
                    avatar_url: url,
                  });
                }}
              />

              <Button
                className="btn-sm rounded-circle px-2 py-1 shadow-sm position-absolute top-0 end-0"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <AiOutlineCloseCircle className="edit-icon" />
              </Button>
              <Input
                addonBefore={"Name"}
                placeholder={full_name}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              <Input
                className="mt-2"
                addonBefore={"Username"}
                placeholder={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Input
                className="mt-2"
                addonBefore={"Website"}
                placeholder={website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
              <Input
                className="mt-2"
                addonBefore={"Bio"}
                placeholder={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
              <Button
                className="btn-grad border-0 px-3 shadow mt-3"
                onClick={() => {
                  updateProfile({
                    username,
                    full_name,
                    website,
                    bio,
                    avatar_url,
                  });
                  setEdit(false);
                }}
              >
                Submit
              </Button>
            </div>
          )}
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
