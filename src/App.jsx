import "./App.css";
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
    question: "Quel président américain a démissionné après le scandale du Watergate en 1974 ?",
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
    question: "Parmi ces quatre pièces de théâtre, laquelle n’a pas été écrite par Molière ?",
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
    question: "En France, la taxe foncière constitue un impôt perçu au profit :",
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
    question: "Quel est le point commun entre ces quatre personnalités ? Geneviève De Gaulle Anthonioz – Marie Curie – Germaine Tillion – Sophie Berthelot",
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
    question: "Parmi ces sites, inscrits au patrimoine mondial de l’Unesco, lequel abrite un mausolée ?",
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
    question: "Quel endroit était la principale place publique administrative, religieuse et commerciale des villes grecques antiques ?",
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
    question: "Lequel de ces pays n’a pas de façade maritime avec la mer Noire ?",
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
              Vous avez gagné {earned}{" "}
              <div
                className="replay"
                onClick={() => {
                  setStop(false);
                  setQuestionNumber(1);
                  letsPlay()
                }}
              >
                Rejoué
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
