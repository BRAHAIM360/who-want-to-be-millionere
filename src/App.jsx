import "./App.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Quiz from "./components/quiz";
import Timer from "./components/Timer";
import phone from "./assets/phone.mp3";
import play from "./assets/play.mp3";
import FivetySound from "./assets/50.mp3";
import useSound from "use-sound";
import AudianceVote from "./components/AudianceVote";
import AudianceVoteSound from "./assets/Audiance.mp3"
const data = [
  {
    id: 1,
    question:
      "Dans quel pays peut-on trouver la Catalogne, l’Andalousie et la Castille ?",
    answers: [
      {
        text: "Portugal",
        correct: false,
        tag: "A",
      },
      {
        text: "Espagne",
        correct: true,
        tag: "B",
      },
      {
        text: "France",
        correct: false,
        tag: "C",
      },
      {
        text: "Angleterre",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 2,
    question: "Quelle est la capitale du Qatar ?",
    answers: [
      {
        text: "Doha",
        correct: true,
        tag: "A",
      },
      {
        text: "Abu Dhabi",
        correct: false,
        tag: "B",
      },
      {
        text: "Dubaï",
        correct: false,
        tag: "C",
      },
      {
        text: "Amman",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 3,
    question: "Quelle était à l’origine la fonction de Facebook ?",
    answers: [
      {
        text: "un site de rencontres",
        correct: true,
        tag: "A",
      },
      {
        text: "un réseau social pour cuisinier",
        correct: false,
        tag: "B",
      },
      {
        text: "album photo en ligne",
        correct: false,
        tag: "C",
      },
      {
        text: "un réseau social estudiantin",
        correct: true,
        tag: "D",
      },
    ],
  },
  {
    id: 4,
    question:
      "Quel président américain a démissionné après le scandale du Watergate en 1974 ?",
    answers: [
      {
        text: "Dwight D. Eisenhower",
        correct: false,
        tag: "A",
      },
      {
        text: "George H. W. Bush",
        correct: false,
        tag: "B",
      },
      {
        text: "Gerald Ford",
        correct: false,
        tag: "C",
      },
      {
        text: "Richard Nixon",
        correct: true,
        tag: "D",
      },
    ],
  },
  {
    id: 5,
    question: "Laquelle des inventions suivantes doit-on à Alfred Nobel ?",
    answers: [
      {
        text: "la dynamite",
        correct: true,
        tag: "A",
      },
      {
        text: "la machine à vapeur",
        correct: false,
        tag: "B",
      },
      {
        text: "l’électricité",
        correct: false,
        tag: "C",
      },
      {
        text: "le téléphone",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 6,
    question: "Qui est le réalisateur du film Avatar (2009) ?",
    answers: [
      {
        text: "George Lucas",
        correct: false,
        tag: "A",
      },
      {
        text: "James Cameron",
        correct: true,
        tag: "B",
      },
      {
        text: "Luc Besson",
        correct: false,
        tag: "C",
      },
      {
        text: "Ron Howard",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 7,
    question:
      "Parmi ces quatre pièces de théâtre, laquelle n’a pas été écrite par Molière ?",
    answers: [
      {
        text: "Le Jeu de l’amour et du hasard",
        correct: true,
        tag: "A",
      },
      {
        text: "Le Malade imaginaire",
        correct: false,
        tag: "B",
      },
      {
        text: "Le Tartuffe",
        correct: false,
        tag: "C",
      },
      {
        text: "Les Femmes savantes",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 8,
    question: "Le Chemin des Dames est une bataille de :",
    answers: [
      {
        text: "la guerre de Cent Ans.",
        correct: false,
        tag: "A",
      },
      {
        text: "la guerre de 1870.",
        correct: false,
        tag: "B",
      },
      {
        text: "la Première Guerre mondiale.",
        correct: true,
        tag: "C",
      },
      {
        text: "la Seconde Guerre mondiale.",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 9,
    question:
      "En France, la taxe foncière constitue un impôt perçu au profit :",
    answers: [
      {
        text: "de la Sécurité sociale.",
        correct: false,
        tag: "A",
      },
      {
        text: "de l’État.",
        correct: false,
        tag: "B",
      },
      {
        text: "de l’Union européenne.",
        correct: false,
        tag: "C",
      },
      {
        text: "des collectivités territoriales.",
        correct: true,
        tag: "D",
      },
    ],
  },
  {
    id: 10,
    question:
      "Quel est le point commun entre ces quatre personnalités ? Geneviève De Gaulle Anthonioz – Marie Curie – Germaine Tillion – Sophie Berthelot",
    answers: [
      {
        text: "Elles ont été choisies pour entrer au Panthéon.",
        correct: true,
        tag: "A",
      },
      {
        text: "Elles ont fait d’importantes découvertes scientifiques.",
        correct: false,
        tag: "B",
      },
      {
        text: "Elles ont occupé un portefeuille ministériel.",
        correct: false,
        tag: "C",
      },
      {
        text: "Elles se sont illustrées par des actes de résistance pendant la Seconde Guerre mondiale.",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 11,
    question: "Que signifie l’abréviation « Cedex » ?",
    answers: [
      {
        text: "courrier d’entreprise à distribution exceptionnelle",
        correct: true,
        tag: "A",
      },
      {
        text: "courrier entre départements exclus",
        correct: false,
        tag: "B",
      },
      {
        text: "courrier envoyé aux départements en exclusivité",
        correct: false,
        tag: "C",
      },
      {
        text: "courrier exceptionnel distribué en express",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 12,
    question:
      "Parmi ces sites, inscrits au patrimoine mondial de l’Unesco, lequel abrite un mausolée ?",
    answers: [
      {
        text: "le Taj Mahal",
        correct: true,
        tag: "A",
      },
      {
        text: "l’Alhambra",
        correct: false,
        tag: "B",
      },
      {
        text: "Persépolis",
        correct: false,
        tag: "C",
      },
      {
        text: "Pergame",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 13,
    question: "Qui a réalisé le film 2001 : l’Odyssée de l’espace ?",
    answers: [
      {
        text: "George Lucas",
        correct: false,
        tag: "A",
      },
      {
        text: "Luc Besson",
        correct: false,
        tag: "B",
      },
      {
        text: "Stanley Kubrick",
        correct: true,
        tag: "C",
      },
      {
        text: "Steven Spielberg",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 14,
    question:
      "Quel endroit était la principale place publique administrative, religieuse et commerciale des villes grecques antiques ?",
    answers: [
      {
        text: "l’acropole",
        correct: false,
        tag: "A",
      },
      {
        text: "l’agora",
        correct: true,
        tag: "B",
      },
      {
        text: "la boulê",
        correct: false,
        tag: "C",
      },
      {
        text: "le forum",
        correct: false,
        tag: "D",
      },
    ],
  },
  {
    id: 15,
    question:
      "Lequel de ces pays n’a pas de façade maritime avec la mer Noire ?",
    answers: [
      {
        text: "la Bulgarie",
        correct: false,
        tag: "A",
      },
      {
        text: "la Géorgie",
        correct: false,
        tag: "B",
      },
      {
        text: "l’Albanie",
        correct: false,
        tag: "C",
      },
      {
        text: "l’Ukraine",
        correct: true,
        tag: "D",
      },
    ],
  },
];

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [stopp, setStop] = useState(false);
  const [earned, setEarned] = useState("DA 0");
  const [letsPlay] = useSound(play, { volume: 0.1 });
  const [Phone, { stop: stopPhone }] = useSound(phone, { volume: 0.1 });
  const [Fifty, { stop: stop50 }] = useSound(FivetySound, { volume: 0.1 });
  const [AudianceAudio, { stop: AudianceAudioStop }] = useSound(AudianceVoteSound, { volume: 0.1 });

  const [pause, setPause] = useState(false);
  const [dropPyramyd, setDropPyramyd] = useState(false);
  const [call_friend, setCall_friend] = useState(true);
  const [audience_help, setAudience_help] = useState(true);
  const [audience_help_elment, setAudience_help_elment] = useState(false);
  const [audianceCalc, setAudianceCalc] = useState([])
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

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(MeneyPyramid.find((m) => m.id === questionNumber - 1).amount);
      AudianceAudioStop()
    stop50();
    stopPhone();
    setFivety_help(false);
    setAudience_help_elment(false)
    call.current.classList?.remove("anime");
    audience.current.classList?.remove("anime");
    fivety.current.classList?.remove("anime");
  }, [MeneyPyramid, questionNumber]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const audianceFunction = (question) => {
    const newArray = [];
    question.answers.map((a) =>
      a.correct
        ?  newArray.push({
            id: a.tag,
            pource: Math.floor(Math.random() * (90 - 65) + 65),
          })
        : newArray.push({
            id: a.tag,
            pource: Math.floor(Math.random() * (60 - 30) + 30),
          })
    );
    setAudianceCalc(newArray)
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
      AudianceAudio()
      setTimer(35);
      e.currentTarget.classList.add("anime");
      e.currentTarget.src = "./images/audiencedes.png";
      audianceFunction( data[questionNumber - 1])

      setAudience_help_elment(true)
    }
  };
  const handelFivety = (e) => {
    if (!fivety_help) {
      Fifty();
      setFivety_help(true);
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
              {" "}
              Vous avez gagné {earned}{" "}
              <div
                className="replay"
                onClick={() => {
                  letsPlay();
                  setQuestionNumber(1);
                }}
              >
                Rejoué
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
                  call={call_friend}
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
              {audience_help_elment && (
                <AudianceVote question={audianceCalc} />
              )}
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
                Fivety={fivety_help}
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
