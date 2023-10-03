import React from "react";
import logo from "./img/marvel-logo-png-transparent.png";
import "./App.css";
// import Home from "./components/Home";
import Characters from "./components/CharacterList";
import CharId from "./components/CharId";
import ComicList from "./components/ComicList";
import ComicId from "./components/ComicId";
import SeriesList from "./components/SeriesList";
import SeriesId from "./components/SeriesId";

import Theme from "./theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Divider, Grid } from "@material-ui/core";

const App = () => {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={Theme}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to the Marvel API</h1>
            <br />
            <Divider className="divider" />
            {/* <Link className="homelink" to="/">
            Home
          </Link> */}
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Link className="characterslink" to="/characters/page/0">
                Characters
              </Link>
              <Link className="characterslink" to="/comics/page/0">
                Comics
              </Link>
              <Link className="characterslink" to="/series/page/0">
                Series
              </Link>
            </Grid>
          </header>
          <div className="App-body">
            <Routes>
              {/* <Route exact path="/" component={Home} /> */}
              {/* <Route exact path='/shows' component={ShowList} /> */}
              <Route exact path="/" />
              <Route exact path="/characters/page/:pageNum" element={<Characters />}></Route>
              <Route exact path="/characters/:id" element={<CharId />}></Route>
              <Route exact path="/comics/page/:pageNum" element={<ComicList />} />
              <Route exact path="/comics/:id" element={<ComicId />} />
              <Route exact path="/series/page/:pageNum" element={<SeriesList />} />
              <Route exact path="/series/:id" element={<SeriesId />} />
              {/* <Route exact path="/comics/page/:page" component={comics} />
            <Route exact path="/comics/:id" component={comicId} />
            <Route exact path="/series/page/:page" component={series} />
            <Route exact path="/series/:id" component={seriesId} /> */}
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
