import "./app.css";
import React, { useEffect, useMemo, useState } from "react";
import Quiz from "./components/quiz";
import Timer from "./components/Timer";
import phone from "./assets/phone.mp3";

import main from "./assets/main.mp3";
import play from "./assets/play.mp3";
import useSound from "use-sound";

const data = [
  {
    id: 1,
    question: "Dans quel pays peut-on trouver la Catalogne, l’Andalousie et la Castille ?",
    answers: [
      {
        text: "Phone",
        correct: false,
        tag: "A",
      },
      {
        text: "Watches",
        correct: true,
        tag: "B",
      },
      {
        text: "Food",
        correct: false,
        tag: "C",
      },
      {
        text: "Cosmetic",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 2,
    question: "When did the website `Facebook` launch?",
    answers: [
      {
        text: "2004",
        correct: true,
        tag: "A",
      },
      {
        text: "2005",
        correct: false,
        tag: "B",
      },
      {
        text: "2006",
        correct: false,
        tag: "C",
      },
      {
        text: "2007",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 3,
    question: "Who played the character of harry potter in movie?",
    answers: [
      {
        text: "Johnny Deep",
        correct: false,
        tag: "A",
      },
      {
        text: "Leonardo Di Caprio",
        correct: false,
        tag: "B",
      },
      {
        text: "Denzel Washington",
        correct: false,
        tag: "C",
      },
      {
        text: "Daniel Red Cliff",
        correct: true,
        tag: "D",
      },
    ],
  },
];

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("DA 0");
  const [letsPlay] = useSound(play,{volume:0.1});
  const [Main] = useSound(main);

  const MeneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "DA 100" },
        { id: 2, amount: "DA  200" },
        { id: 3, amount: "DA  300" },
        { id: 4, amount: "DA  500" },
        { id: 5, amount: "DA  1 000" },
        { id: 6, amount: "DA  2 000" },
        { id: 7, amount: "DA  4 000" },
        { id: 8, amount: "DA  8 000" },
        { id: 9, amount: "DA  16 000" },
        { id: 10, amount: "DA  32 000" },
        { id: 11, amount: "DA  64 000" },
        { id: 12, amount: "DA  125 000" },
        { id: 13, amount: "DA  250 000" },
        { id: 14, amount: "DA  500 000" },
        { id: 15, amount: "DA  1 000 000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(MeneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [MeneyPyramid, questionNumber]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay],);

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <>
            <h1 className="endText">
              {" "}
              You Earned {earned}{" "}
              <div
                className="replay"
                onClick={() => {
                  setStop(false);
                  setQuestionNumber(1);
                  letsPlay()
                }}
              >
                Replay
              </div>
            </h1>
          </>
        ) : (
          <>
            <div className="top">
              <div className="timer">
                <Timer setStop={setStop} questionNumber={questionNumber} />
              </div>
            </div>
            <div className="bottom">
              <Quiz
                data={data}
                setStop={setStop}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}
              />{" "}
            </div>{" "}
          </>
        )}
      </div>

      <div className="pyramid">
        <ul className="moneyList">
          {MeneyPyramid.map((m) => (
            <li
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
              key={m.id}
            >
              <span className="moneyListItemNumber">{m.id} </span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
