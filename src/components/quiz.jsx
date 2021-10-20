import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

function Quiz({ data, setStop, setQuestionNumber, questionNumber }) {
  const [question, setQestion] = useState(null);

  const [slectedAnswere, setSlectedAnswere] = useState(null);
  const [className, setClassName] = useState("answer");

  const [Wrong] = useSound(wrong, { volume: 0.1 });
  const [Correct] = useSound(correct, { volume: 0.1 });
  const delay = (duration, callback) => {
    setTimeout(() => callback(), duration);
  };

  const handelClick = (a) => {
    setSlectedAnswere(a);

    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(5000, () => {
      if (a.correct) {
        Correct();
        delay(2000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSlectedAnswere(null);
        });
      } else {
        Wrong();
        delay(2000, () => {
          setStop(true);
        });
      }
    });
  };
  useEffect(() => {
    setQestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a) => (
          <div
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
