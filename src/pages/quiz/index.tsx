import { useState, useEffect } from "react";
import { Layout, Card, Breadcrumb, theme, Input, Avatar, Badge } from "antd";
import { HomeFilled, BellTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { quiz } from "../../../assets/data/quiz";
import { supabase } from "../../../utils/initSupabase";

const Quiz = () => {
  const { Content, Header, Footer } = Layout;
  const { Search } = Input;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value: string) => console.log(value);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("quiz").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setData(data);
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header
        style={{ padding: 0, background: colorBgContainer }}
        className="d-flex flex-row-reverse"
      >
        <div>
          <Badge count={3} className="me-3" style={{ fontSize: "13px" }}>
            <Avatar
              size={35}
              shape="circle"
              style={{ backgroundColor: "white" }}
              icon={
                <BellTwoTone style={{ fontSize: "22px" }} className="mb-3" />
              }
            />
          </Badge>{" "}
          <Avatar
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            size={35}
            className="me-5"
          >
            U
          </Avatar>
        </div>
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} className="d-flex">
          <Breadcrumb.Item>
            <Link href="/quiz">
              <HomeFilled style={{ paddingLeft: 5 }} />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Quiz</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            color: "black",
          }}
          className="p-5 d-flex justify-content-center align-items-center"
        >
          <Card
            className={`quiz-container border`}
            hoverable={true}
            bordered={true}
          >
            {!showResult ? (
              <div>
                <div>
                  <span className="active-question-no">
                    {addLeadingZero(activeQuestion + 1)}
                  </span>
                  <span className="total-question">
                    /{addLeadingZero(questions.length)}
                  </span>
                </div>
                <h2>{question}</h2>
                <ul>
                  {choices.map((answer, index) => (
                    <li
                      onClick={() => onAnswerSelected(answer, index)}
                      key={answer}
                      className={
                        selectedAnswerIndex === index ? "selected-answer" : null
                      }
                    >
                      {answer}
                    </li>
                  ))}
                </ul>
                <div className="flex-right">
                  <button
                    onClick={onClickNext}
                    disabled={selectedAnswerIndex === null}
                  >
                    {activeQuestion === questions.length - 1
                      ? "Finish"
                      : "Next"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="result">
                <h3>Result</h3>
                <p>
                  Total Question: <span>{questions.length}</span>
                </p>
                <p>
                  Total Score:<span> {result.score}</span>
                </p>
                <p>
                  Correct Answers:<span> {result.correctAnswers}</span>
                </p>
                <p>
                  Wrong Answers:<span> {result.wrongAnswers}</span>
                </p>
              </div>
            )}
          </Card>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
    </>
  );
};

export default Quiz;
