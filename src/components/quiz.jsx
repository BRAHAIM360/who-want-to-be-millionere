import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

function Quiz({
  data,
  setStop,
  setQuestionNumber,
  questionNumber,
  setPause,
  Fivety,
}) {
  const [question, setQestion] = useState(null);
const [isSelect, setIsSelect] = useState(true)
  const [slectedAnswere, setSlectedAnswere] = useState(null);
  const [className, setClassName] = useState("answer");

  const [Wrong] = useSound(wrong, { volume: 0.1 });
  const [Correct] = useSound(correct, { volume: 0.1 });
  const delay = (duration, callback) => {
    setTimeout(() => callback(), duration);
  };

  const handelClick = (a) => {
 if (isSelect) {
   setIsSelect(false)
  setSlectedAnswere(a);
  setPause(true);
  setClassName("answer active");
  delay(3000, () => {
    setClassName(a.correct ? "answer correct" : "answer wrong");
  });
  delay(5000, () => {
    if (a.correct) {
      Correct();
      delay(4000, () => {
        setPause(false);
        setQuestionNumber((prev) => prev + 1);
        setSlectedAnswere(null);
      });
    } else {
      Wrong();
      const quest =data[questionNumber - 1];
      const found = quest.answers.find(a => a.correct===true);
      document.getElementById(found.tag).classList.add("correctWrong");
      delay(3000, () => {
        setStop(true);
        setPause(false);
      });
    }
  });
 }   
  };
  useEffect(() => {
    setQestion(data[questionNumber - 1]);
    setIsSelect(true)
  }, [data, questionNumber,question]);
  useEffect(() => {
    if(Fivety && question){
      question.answers[0].correct ? question.answers[1].text="" :question.answers[0].text=""
      question.answers[2].correct ? question.answers[3].text="" :question.answers[2].text=""
    }
  }, [Fivety]);
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div key={a.tag} id={a.tag}
            className={slectedAnswere === a ? className : "answer "}
            onClick={() => handelClick(a)}
          >
            <div className="tag">{a.tag} -</div>
            <div className="text">{a.text} </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
