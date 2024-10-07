import React, { useEffect, useState } from "react";
import "./Questions.scss";
import { get } from "../../utils/request.util";
function Questions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    get(`https://allindiaexam.azurewebsites.net/onboarding/questions`, {
      Authorization: localStorage.getItem('token')
    }, (response) => {
      console.log('success questions', response);
      setQuestionData(response.data.data);
    }, (error) => {
      console.log('error questions', error);
    });
  }, []);

  const getComponent = () => {
    if (!questionData.length) return;
    const type = questionData[questionIndex].type;
    if (type === "dropdown") {
      const options = questionData[questionIndex].options;
      return (
        <select>
          {options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      );
    }
  };

  const fetchNextQuestion = () => {
    if (questionIndex === questionData.length)
      window.location.href = "/aie/home";
    else 
      setQuestionIndex(questionIndex+1);
  }

  return (
    <div className="question-layout">
      <p>{questionData && questionData[questionIndex]?.title}</p>
      <div className="question-container">
        <span class="material-symbols-outlined">arrow_back_ios</span>
        {getComponent()}
        <span class="material-symbols-outlined" onClick={fetchNextQuestion}>arrow_forward_ios</span>
      </div>
    </div>
  );
}

export default Questions;
