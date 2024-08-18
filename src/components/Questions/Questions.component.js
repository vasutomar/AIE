import React, { useState } from "react";
import "./Questions.scss";
function Questions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const data = [
    {
      title: "Which examination are you preparing for?",
      type: "dropdown",
      options: [
        "UPSC Civil Services Examination (CSE)",
        "IBPS PO (Probationary Officer)",
        "IBPS SO (Specialist Officer)",
        "IBPS Clerk",
        "IBPS RRB (Regional Rural Banks)",
        "SBI PO",
        "RRB NTPC (Non-Technical Popular Categories)",
        "Indian Coast Guard",
        "SSC CGL (Combined Graduate Level) Exam",
        "ISRO/Central Government Scientific & Technical Organizations Exams",
        "SEBI Grade A",
        "NABARD",
        "UPSC CMS",
        "Judiciary",
        "CAT",
        "XAT",
        "SNAP",
        "CMAT",
        "CSIR NET",
        "UGC NET",
      ],
    },
  ];

  const getComponent = () => {
    const type = data[questionIndex].type;
    if (type === "dropdown") {
      const options = data[questionIndex].options;
      return (
        <select>
          {options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      );
    }
  };

  const gotoHome = () => {
    window.location.href = "/aie/home"
  }

  return (
    <div className="question-layout">
      <p>Which examamination are you preparing for?</p>
      <div className="question-container">
        <span class="material-symbols-outlined">arrow_back_ios</span>
        {getComponent()}
        <span class="material-symbols-outlined" onClick={gotoHome}>arrow_forward_ios</span>
      </div>
    </div>
  );
}

export default Questions;
