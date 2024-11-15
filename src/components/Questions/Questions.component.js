import React, { useEffect, useState } from "react";
import "./Questions.scss";
import { get, getAppUrl, patch } from "../../utils/request.util";
function Questions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);

  const getComponent = () => {
    if (!questionData.length) return;
    const type = questionData[questionIndex].Type;
    if (type === "dropdown") {
      const options = questionData[questionIndex].Options;
      return (
        <select id={questionData[questionIndex].QuestionId}>
          {options.map((option) => {
            return <option key={option+'_key'} value={option}>{option}</option>;
          })}
        </select>
      );
    }
  };

  const fetchNextQuestion = () => {
    /* Currently configured to just store exam details */
    const currentAnswer = document.getElementById(questionData[questionIndex].QuestionId).value;
    if (currentAnswer) {
      localStorage.setItem('exam', currentAnswer);
      const url = `${getAppUrl()}/profile/}`;
      patch(
        url,
        {
          exams: [currentAnswer]
        },
        {
          Authorization: localStorage.getItem("token"),
        },
        (response) => {
          /* Do Nothing */
        },
        (error) => {
          /* Handle Error */
        }
      )
    }

    if (questionIndex === questionData.length - 1) {
      localStorage.setItem("isOnboardingComplete", true);
      window.location.href = "/aie/discussions";
    } else setQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    if (!questionData.length) {
      get(
        `${getAppUrl()}/onboarding/questions`,
        {
          Authorization: localStorage.getItem("token"),
        },
        (response) => {
          setQuestionData(response.data.data);
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  });

  return (
    <div className="question-layout">
      <p>{questionData.length && questionData[questionIndex].Title}</p>
      <div className="question-container">
        <span className="material-symbols-outlined">arrow_back_ios</span>
        {getComponent()}
        <span className="material-symbols-outlined" onClick={fetchNextQuestion}>
          arrow_forward_ios
        </span>
      </div>
    </div>
  );
}

export default Questions;
