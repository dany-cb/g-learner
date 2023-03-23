import Head from "next/head";
import { Card, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Header from "components/Header";

Home.noBaseLayout = true;

export default function Home() {
  return (
    <>
      <Head>
        <title>G-Learner | AI Powered LMS</title>
        <meta name="description" content="AI powered LMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-5">
        <Header />
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
                <GithubOutlined className="me-2" />
                Github
              </Button>
            </div>
          </div>
        </section>
        <section className="container">
          <hr />
          <footer>
            <p className="text-center">
              Made with ❤️ and code by{" "}
              <a
                href="
                  /
                  "
                target="_blank"
                rel="noopener noreferrer"
              >
                Scuderia
              </a>
            </p>
          </footer>
        </section>
        <section className="container mt-3">
          <h1>Feed</h1>
          <p className="fs-5">
            Our platform provides you with personalized learning recommendations
            based on your interests and learning preferences. Our algorithms
            analyze vast amounts of data to understand your unique learning
            patterns, and suggest courses and resources that are most likely to
            help you achieve your learning goals. Join our community of learners
            today and experience the power of AI in personalized learning.
          </p>
          <div className="text-center d-flex justify-content-center align-items-center">
            <Card
              style={{ width: "30rem" }}
              className="shadow border-0 py-2 my-3"
            >
              <div>
                <h3 className="gradient-text">ReactJS</h3>
                <p>
                  React is a free and open-source front-end JavaScript library
                  for building user interfaces based on components.
                </p>
                <Button className="btn-grad border-0 px-3 shadow">
                  Start Learning!
                </Button>
              </div>
            </Card>
            <Card
              style={{ width: "30rem" }}
              className="shadow border-0 ms-5 py-2"
            >
              <div>
                <h3 className="gradient-text">Python</h3>
                <p>
                  Python is a high-level programming language. Its design
                  emphasizes code readability with the use of significant
                  indentation.
                </p>
                <Button className="btn-grad border-0 px-3 shadow">
                  Start Learning!
                </Button>
              </div>
            </Card>
          </div>
          <hr className="mt-5" />
        </section>

        <section className="container mt-5">
          <h1 className="text-end">Courses</h1>
          <p className="fs-5 text-end">
            Whether you are seeking career advice, feedback on your work, or
            just looking for some inspiration, our forum is the place to be. So,
            join our community today and become part of a vibrant learning
            network where everyone is encouraged to share and grow together!
          </p>
          <div className="text-center d-flex justify-content-center align-items-center">
            <Card style={{ width: "30rem" }} className="shadow border-0 py-2">
              <div>
                <h3 className="gradient-text">Open Forum</h3>
                <p>
                  Our forum is a safe and inclusive space where you can ask
                  questions, seek advice, and engage in lively discussions on
                  various topics related to learning and education.
                </p>
                <Button className="btn-grad border-0 px-3 shadow">
                  Let{`'`}s Socialize!
                </Button>
              </div>
            </Card>
          </div>
          <hr className="mt-5" />
        </section>

        <section className="container mt-5">
          <h1 className="">Quiz</h1>
          <p className="fs-5">
            Our quizzes are designed to be interactive, engaging and
            informative, providing instant feedback and explanations to help you
            learn and improve. You can participate in quizzes hosted by other
            learners or create your own and challenge others to take them. Join
            us today and start your journey to becoming a quiz champion!
          </p>
          <div className="text-center d-flex justify-content-start align-items-center">
            <Button className="btn-grad border-0 px-3 shadow me-2">
              Be an expert Host!
            </Button>
            {`(or)`}
            <Button className="btn-grad-inv border-0 px-3 shadow ms-2">
              Be a proud Participant!
            </Button>
          </div>
          <hr className="mt-5" />
        </section>

        <section className="container mt-5">
          <h1 className="text-end">Leaderboard</h1>
          <p className="fs-5 text-end">
            Our leaderboard is a great way to challenge yourself, set goals, and
            celebrate your accomplishments. It{`'`}s also an opportunity to
            connect with other learners and form study groups, share resources
            and collaborate on projects. So, join our platform today and see how
            far you can climb on our leaderboard!
          </p>
          <div className="text-center d-flex justify-content-end align-items-center">
            <Button className="btn-grad border-0 px-3 shadow">
              Peek Leaderboard!
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
