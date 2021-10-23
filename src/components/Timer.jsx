import { useEffect } from "react";

export default function Timer({ setStop, questionNumber, pause, call ,timer,setTimer}) {

  useEffect(() => {
    if (timer === 0) return setStop(true);
    const interval = setInterval(() => {
      if(!pause) { call ? setTimer(47): setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setStop]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
}
