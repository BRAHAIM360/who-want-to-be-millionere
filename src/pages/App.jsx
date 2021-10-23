import "./App.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Quiz from "./../components/quiz";
import Timer from "./../components/Timer";
import phone from "./../assets/phone.mp3";
import play from "./../assets/play.mp3";
import FivetySound from "./../assets/50.mp3";
import useSound from "use-sound";
import AudianceVote from "./../components/AudianceVote";
import AudianceVoteSound from "./../assets/Audiance.mp3";
import { dataFR, dataEN, dataAR } from "./../data";

function App() {
  const [Lang, setLang] = useState("en");
  let data = [];
  if (Lang === "fr") {
    data = dataFR;
  } else if (Lang === "en") {
    data = dataEN;
  } else if (Lang === "ar") {
    data = dataAR;
    document.body.dir = "rtl";
  }

  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [stopp, setStop] = useState(false);
  const [earned, setEarned] = useState("DA 0");
  const [letsPlay] = useSound(play, { volume: 0.1 });
  const [Phone, { stop: stopPhone }] = useSound(phone, { volume: 0.1 });
  const [Fifty, { stop: stop50 }] = useSound(FivetySound, { volume: 0.1 });
  const [AudianceAudio, { stop: AudianceAudioStop }] = useSound(
    AudianceVoteSound,
    { volume: 0.1 }
  );

  const [pause, setPause] = useState(false);
  const [dropPyramyd, setDropPyramyd] = useState(false);
  const [call_friend, setCall_friend] = useState(true);
  const [audience_help, setAudience_help] = useState(true);
  const [audience_help_elment, setAudience_help_elment] = useState(true);
  const [audianceCalc, setAudianceCalc] = useState([]);
  const [fivety_help, setFivety_help] = useState(false);

  const call = useRef();
  const fivety = useRef();
  const audience = useRef();
  const [timer, setTimer] = useState(30);
  const [Fivety, setFivety] = useState(true);

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

  const loseMessage = (m) => {
    if (m === "you win") {
      if (Lang === "fr") {
        return "Vous avez gagné " + earned;
      } else if (Lang === "en") {
        return "You Earned " + earned;
      } else if (Lang === "ar") {
        return "لقد فزت ب " + earned;
      }
    } else if (m === "replay") {
      if (Lang === "fr") {
        return "rejoué";
      } else if (Lang === "en") {
        return "replay";
      } else if (Lang === "ar") {
        return "العب مرة أخرى. ";
      }
    }
  };
  useEffect(() => {
    setLang(window.location.pathname.substr(1));
    questionNumber > 1 &&
      setEarned(MeneyPyramid.find((m) => m.id === questionNumber - 1).amount);
    AudianceAudioStop();
    stop50();
    stopPhone();
    setFivety_help(false);
    setAudience_help_elment(false);
    call.current?.classList?.remove("anime");
    audience.current?.classList?.remove("anime");
    fivety.current?.classList?.remove("anime");
  }, [MeneyPyramid, questionNumber]);

  const audianceFunction = (question) => {
    const newArray = [];
    question.answers.map((a) =>
      a.correct
        ? newArray.push({
            id: a.tag,
            pource: Math.floor(Math.random() * (90 - 65) + 65),
          })
        : newArray.push({
            id: a.tag,
            pource: Math.floor(Math.random() * (60 - 30) + 30),
          })
    );
    setAudianceCalc(newArray);
  };
  const handelCall = (e) => {
    if (call_friend) {
      setCall_friend(false);
      setTimer(45);
      Phone();
      e.currentTarget.classList.add("anime");
      e.currentTarget.src = "./images/calldes.png";
    }
  };
  const handelAudience = (e) => {
    if (audience_help) {
      AudianceAudio();
      setTimer(35);
      e.currentTarget.classList.add("anime");
      e.currentTarget.src = "./images/audiencedes.png";
      audianceFunction(data[questionNumber - 1]);
      setAudience_help(false)
      setAudience_help_elment(true);
    }
  };
  const handelFivety = (e) => {
    if (Fivety) {
      Fifty();
      setFivety(false);
      e.currentTarget.classList.add("anime");
      e.currentTarget.src = "./images/50des.png";
    }
  };

  return (
    <div className="app">
      <div className="main">
        {stopp ? (
          <>
            <h1 className="endText">
              {questionNumber === 16 ? (
                <img src="https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B340%2C306%5D&w=2000&h=1333&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2020%2F11%2F30%2Fdavid-chang-1-2000.jpg" />
              ) : (
                loseMessage("you win")
              )}

              <div
                className="replay"
                onClick={() => {
                  letsPlay();
                  setQuestionNumber(1);
                  setStop();
                }}
              >
                {loseMessage("replay")}
              </div>
            </h1>
          </>
        ) : (
          <>
            <div className="top">
              <div className="help">
                <img
                  className="call"
                  src="./images/call.png"
                  ref={call}
                  onClick={(e) => handelCall(e)}
                />
                <img
                  className="call"
                  src="./images/50.png"
                  ref={fivety}
                  onClick={(e) => handelFivety(e)}
                />
                <img
                  className="call"
                  src="./images/audience.png"
                  ref={audience}
                  onClick={(e) => handelAudience(e)}
                />
              </div>
              {audience_help_elment && <AudianceVote question={audianceCalc} />}
              <div className="timer">
                <Timer
                  timer={timer}
                  setTimer={setTimer}
                  setStop={setStop}
                  questionNumber={questionNumber}
                  pause={pause}
                />
              </div>
            </div>
            <div className="bottom">
              <Quiz
                data={data}
                setStop={setStop}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}
                setPause={setPause}
                Fivety={Fivety}
                setFivety={setFivety}
              />{" "}
            </div>{" "}
          </>
        )}
      </div>

      <div
        className={dropPyramyd ? "pyramid activateMenu" : "pyramid "}
        onClick={() => setDropPyramyd(!dropPyramyd)}
      >
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
              <span className="moneyListItemNumber ">{m.id} </span>
              <span className="moneyListItemAmount ">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
