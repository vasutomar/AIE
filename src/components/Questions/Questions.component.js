import React, { useEffect, useState } from "react";
import "./Questions.scss";
import { get, getAppUrl, patch } from "../../utils/request.util";
function Questions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    get(
      `${getAppUrl()}/onboarding/questions`,
      {
        Authorization: localStorage.getItem("token"),
      },
      (response) => {
        setQuestionData(response.data.data);
      },
      (error) => {
        /*Handle Error*/
      }
    );
  }, []);

  const getComponent = () => {
    if (!questionData.length) return;
    const type = questionData[questionIndex].type;
    if (type === "dropdown") {
      const options = questionData[questionIndex].options;
      return (
        <select id={questionData[questionIndex].questionId}>
          {options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      );
    }
  };

  const fetchNextQuestion = () => {
    /* Currently configured to just store exam details */
    const currentAnswer = document.getElementById(questionData[questionIndex].questionId).value;
    if (currentAnswer) {
      localStorage.setItem('exam', currentAnswer);
      const url = `${getAppUrl()}/profile/${localStorage.getItem('username')}`;
      patch(
        url,
        {
          exams: [currentAnswer]
        },
        {
          Authorization: localStorage.getItem("token"),
        },
        (response) => {
          setQuestionData(response.data.data);
        },
        (error) => {
          /* Handle Error */
        }
      )
    }

    if (questionIndex === questionData.length - 1) {
      localStorage.setItem("isOnboardingComplete", true);
      window.location.href = "/aie/home";
    } else setQuestionIndex(questionIndex + 1);
  };

  return (
    <div className="question-layout">
      <p>{questionData && questionData[questionIndex]?.title}</p>
      <div className="question-container">
        <span class="material-symbols-outlined">arrow_back_ios</span>
        {getComponent()}
        <span class="material-symbols-outlined" onClick={fetchNextQuestion}>
          arrow_forward_ios
        </span>
      </div>
    </div>
  );
}

export default Questions;
