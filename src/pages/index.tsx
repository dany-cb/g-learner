import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Roboto } from "@next/font/google";
import Login from "../../components/login";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>G-LEARNER</title>
        <meta name="description" content="AI powered LMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className}>
        <Login />
      </main>
    </>
  );
}
