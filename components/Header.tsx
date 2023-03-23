import { useState, useEffect } from "react";
import { Layout, Popover, Button } from "antd";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "utils/initSupabase";
import { useRouter } from "next/router";

const Header = () => {
  const { Header } = Layout;
  const user = useUser();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [full_name, setFullName] = useState<string>("");

  async function getProfile() {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, full_name, website, avatar_url`)
      .eq("id", user.id)
      .single();

    if (data) {
      setFullName(data.full_name);
      console.log(data);
    } else if (error && status !== 406) {
      console.log("No profile found");
    }
  }

  const content = (
    <div className="text-center d-flex flex-column justify-content-center align-items-center">
      {router.pathname !== "/profile" && (
        <Button
          className="btn-grey border-0 btn-sm rounded mb-2 shadow-sm"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <p className="m-0">View Profile</p>
        </Button>
      )}
      <Button
        className="btn-grey border-0 btn-sm rounded shadow-sm"
        onClick={() => {
          supabase.auth.signOut();
          router.push("/");
        }}
      >
        <p className="m-0">Logout?</p>
      </Button>
    </div>
  );

  useEffect(() => {
    if (user) {
      getProfile();
    } else {
      router.push("/login");
    }
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Header
      style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      className={`d-flex justify-content-between align-items-center p-3 ${
        scrolled ? "header scrolled" : "header"
      }`}
    >
      <h2 className="w-25 m-0">G-Learner</h2>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ width: "30%" }}
      >
        <Link href="/feed" className="text-reset text-decoration-none">
          <h5 className="m-0">Feed</h5>
        </Link>
        <Link href="/courses" className="text-reset text-decoration-none">
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
            <Button className="btn-grad border-0 btn-sm rounded" href="/login">
              <h6 className="m-0">Login</h6>
            </Button>
          ) : (
            <Popover
              content={content}
              placement="bottomRight"
              title={
                <>
                  Hello, {full_name.length > 0 ? full_name : user.email}!
                  <hr className="mt-0" />
                </>
              }
              trigger="click"
            >
              <div className="btn-grad border-0 btn-sm rounded-circle p-3 btn-profile text-center">
                <h6 className="m-0">
                  {full_name.length > 0
                    ? full_name[0].toUpperCase()
                    : user.email[0].toUpperCase()}
                </h6>
              </div>
            </Popover>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Header;
