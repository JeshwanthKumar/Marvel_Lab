import React, { useState, useEffect } from "react";
import Theme from "../theme";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import "../App.css";
import SearchChar from "./SearchChar";
import background from "../img/marvelChar1.jpg";
import ErrorPage from "./ErrorPage";
import noImage from "../img/standard_fantastic.gif";
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.1), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#1e8678",
    fontWeight: "bold",
    fontSize: 12,
  },
});

const md5 = require("blueimp-md5");
const publickey = "YOUR_API_KEY";
const privatekey = "YOUR_API_KEY";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
const CharacterList = (props) => {
  // const AllCharUrl = url + `&limit=20`;
  const { pageNum } = useParams();
  const limitPerPage = 48;
  const classes = useStyles();
  //const pageNumber = props.match.params.pageNum;
  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(undefined);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [invalidReq, setInvalidReq] = useState(true);
  //   const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [totalPages, setTotalPages] = useState(0);
  let card = null;
  //   const goToNextPage = (pageNum) => {
  //     console.log("Next page");
  //     setCurrentPage(pageNum + 1);
  //   };
  //   const goToPreviousPage = (pageNum) => {
  //     console.log("Previous page");
  //     setCurrentPage(pageNum - 1);
  //   };

  useEffect(() => {
    console.log("On loading useeffect");
    async function fetchData() {
      // try {
      //   let pageNo = parseInt(currentPage);
      //   if (isNaN(pageNo) || typeof pageNo !== "number" || pageNo < 0) {
      //
      //   }
      try {
        if (parseInt(pageNum) < 0 || isNaN(parseInt(pageNum)) || typeof parseInt(pageNum) !== "number") {
          console.log("Error");
          setInvalidReq(true);
          setLoading(false);
          return;
        }
        try {
          let page = parseInt(pageNum);
          let offset = limitPerPage * page;
          const { data } = await axios.get(url + "&limit=" + limitPerPage + "&offset=" + offset);
          console.log(data);
          let pages = parseInt(data.data.total / limitPerPage);
          console.log(data.data.results);
          if (parseInt(pageNum) > pages) {
            setInvalidReq(true);
            setLoading(false);
            return;
          }
          setTotalPages(pages);
          setShowData(data.data.results);
          setLoading(false);
          setInvalidReq(false);
        } catch (e) {
          console.log(e);
        }
        // } catch (e) {
        //   console.log("Invalid Page number");
        // }
      } catch (e) {
        console.log("Invalid page number");
      }
    }
    fetchData();
  }, [pageNum]);

  useEffect(() => {
    console.log("search useeffect fired");
    async function fetchData() {
      try {
        let page = parseInt(pageNum);
        let offset = limitPerPage * page;
        console.log(`in fetch searchTerm : ${searchTerm}`);
        const { data } = await axios.get(
          url + "&nameStartsWith=" + searchTerm + "&limit=" + limitPerPage + "&offset=" + offset
        );
        setSearchData(data.data.results);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const buildCard = (characters) => {
    return (
      <>
        <ThemeProvider theme={Theme}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={characters.id} style={{ background: Theme.palette }}>
            <Card className={classes.card} variant="outlined">
              <CardActionArea>
                <Link to={`/characters/${characters.id}`}>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    image={`${characters.thumbnail.path + "/standard_fantastic"}.${characters.thumbnail.extension}`}
                    title="show image"
                  />
                  <CardContent>
                    <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                      {characters.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {characters.description ? characters.description.substring(0, 139) + "..." : "No Description"}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        </ThemeProvider>
      </>
    );
  };
  if (searchTerm) {
    card =
      searchData &&
      searchData.map((searchCharacter) => {
        let characters = searchCharacter;
        if (characters) {
          console.log(searchData);
          return buildCard(characters);
        } else {
          return "Please provide a valid character name";
        }
      });
  } else {
    card =
      showData &&
      showData.map((characters) => {
        return buildCard(characters);
      });
  }
  console.log(showData);

  if (loading) {
    return (
      <div>
        {/* <h2>Loading...</h2> */}
        <CircularProgress />
      </div>
    );
  } else {
    if (invalidReq) {
      return <ErrorPage />;
    } else {
      return (
        <>
          {/* <div> */}
          {/* <Router>
          <Route> */}

          <div>
            {/* <Divider /> */}
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <article className="articleChar">
              <picture className="pictureChar">
                <source media="(min-width: 0px)" srcSet={background} />
                <img src={background} alt="background" />
              </picture>
              {/* <img className="image" src={background} alt="background" /> */}
              <h1 className="charHeader">Marvel Characters</h1>
            </article>
            {/* <Divider /> */}
            <SearchChar searchValue={searchValue} />
            <br />
            <br />
            <Grid container alignItems="center" justifyContent="center" spacing={5}>
              {card}
            </Grid>
          </div>
          <br />
          <br />
          {searchTerm.length === 0 && (
            <div className="pagination">
              <Button className="button">
                <Link
                  to={`/characters/page/${parseInt(pageNum) - 1}`}
                  // onClick={goToPreviousPage}
                  className={`prev ${parseInt(pageNum) === 0 ? "disabled" : ""}`}
                >
                  Previous
                </Link>
              </Button>
              {pageNum}
              <Button className="button">
                <Link
                  to={`/characters/page/${parseInt(pageNum) + 1}`}
                  // onClick={goToPreviousPage}
                  className={`prev ${parseInt(pageNum) === totalPages ? "disabled" : ""}`}
                  //   className={`next ${parseInt(pageNum) === 0 ? "disabled" : ""}`}
                >
                  Next
                </Link>
              </Button>
            </div>
          )}
          {/* </Route>
        </Router> */}
        </>
      );
    }
  }
};

export default CharacterList;
