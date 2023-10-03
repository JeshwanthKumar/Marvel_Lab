import React from "react";
import "../App.css";
import background from "./img/marvelChar.jpg";

const Home = () => {
  return (
    <>
      <div>
        <p>This is a website that talks about MARVEL characters, comics and series</p>

        <p className="hometext">
          The application queries three of Marvel API's end-points:{" "}
          <a rel="noopener noreferrer" target="_blank" href="https://gateway.marvel.com:443/v1/public/characters">
            https://gateway.marvel.com:443/v1/public/characters
          </a>{" "}
          <a rel="noopener noreferrer" target="_blank" href="https://gateway.marvel.com:443/v1/public/comics">
            https://gateway.marvel.com:443/v1/public/comics
          </a>{" "}
          and{" "}
          <a rel="noopener noreferrer" target="_blank" href="https://gateway.marvel.com:443/v1/public/series">
            https://gateway.marvel.com:443/v1/public/series
          </a>{" "}
        </p>
      </div>
      <div>
        <article className="articleChar">
          <picture className="pictureChar">
            <source media="(min-width: 0px)" srcSet={background} />
            <img src={background} alt="background" />
          </picture>
        </article>
      </div>
    </>
  );
};

export default Home;
