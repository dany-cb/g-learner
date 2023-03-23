import Head from "next/head";
import Login from "../../components/Login";

const login = () => {
  return (
    <div>
      <Head>
        <title>G-LEARNER | Login</title>
        <meta name="description" content="AI powered LMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <Login />
      </main>
    </div>
  );
};

login.noBaseLayout = true;

export default login;
