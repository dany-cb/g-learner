import React, {useState,useEffect} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import { Layout, theme, Badge, Avatar, Breadcrumb } from "antd";
import {BellTwoTone, HomeFilled } from "@ant-design/icons";
import { quiz } from "assets/data/quiz";
import { supabase } from "../../../utils/initSupabase";

const Quizpage = () =>{
    const {Header, Content, Footer } = Layout;
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      const router = useRouter();
      
      const [qns, setQns] = useState([]);
      const name =parseInt(router.asPath.split("/")[2]);
      
      
      
      useEffect(() => {
        const fetchData = async () => {
          
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("quiz_id", name );
        if (error) {
          console.log(error);
        } else {
          setQns(data);
          console.log("data",data);
        }
    };

    fetchData();
  }, []);


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
          <Breadcrumb.Item><Link href="/quiz">Quiz</Link></Breadcrumb.Item>
          {/* <Breadcrumb.Item>{id}</Breadcrumb.Item> */}
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            color: "black",
          }}
          className="p-5 d-flex justify-content-center align-items-center quiz-container"
        >
           { !showResult ? (
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

            </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
        G-learner ©2023 Created by Scuderia
      </Footer>
        </>
    )

}

export default Quizpage;