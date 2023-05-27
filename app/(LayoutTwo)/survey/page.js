"use client";
import "./Survey.css";
import QuestionGroup from "@/components/minhkhoi/QuestionGroup/QuestionGroup";

import { useState } from "react";

const Survey = () => {
  const label = [
    {
      text: "Cậu có ổn không?",
      answersList: ["Có", "Không", "Tớ không biết nữa"],
    },
    {
      text: "Cậu có cần giúp đỡ ngay không?",
      answersList: ["Gọi đến hotline hỗ trợ", "Không cần đâu"],
    },
    {
      text: "Dạo này cậu hay thấy lo lắng chứ?",
      answersList: ["Gần như mọi ngày", "Đôi khi", "Thường xuyên", "Không có"],
    },
  ];
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const test = (id) => {
    console.log(id, "id");
    if (id < label.length) {
      return (
        <QuestionGroup
          label={label[id].text}
          answersList={label[id].answersList}
          handleChooseAnswer={(e) => {
            setScore((prev) => prev + Number(e.target.attributes.data.value));
            setSurvey(() => test(id + 1));
            // console.log([e.target], [e.target.attributes.data.value]);
          }}
          key={id}
        />
      );
    } else {
      setShowScore(true);
    }
  };
  const [survey, setSurvey] = useState(test(0));

  return (
    <div className="survey-test__wrapper">
      {survey}
      {showScore && (
        <div
          style={{
            fontSize: "2.2rem",
            fontFamily: "Be VietNam Pro",
            color: "#87a173",
          }}
        >
          Score: {score}
        </div>
      )}
    </div>
  );
};

export default Survey;
