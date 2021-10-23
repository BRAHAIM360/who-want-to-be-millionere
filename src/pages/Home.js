import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIntro(false);
    }, 21000);
  }, []);

  return (
    <>
      {intro ? (
        <video id="background-video" autoPlay onClick={() => setIntro(false)}>
          <source src="/video/intro.mkv" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="maine">
          <Link className="container" to="/fr">
            <img src="/images/logo/fr.png" />
            <div>Français</div>
          </Link>
          <Link className="container" to="/en">
              <img src="/images/logo/en.png" />
              <div>English</div>
          </Link>

          <Link className="container" to="/ar">
              <img id="ar" src="/images/logo/ar.png" />
              <div>العربية</div>
          </Link>
        </div>
      )}{" "}
    </>
  );
}

export default Home;
