import React, { useState, useEffect } from "react";
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
import ErrorPage from "./ErrorPage";
import background from "../img/marvelComics.jpg";
import SearchComic from "./SearchComic";

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
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
const publickey = "ac016025143dcfda2f4f0f8ae4318fcd";
const privatekey = "20d4987a8dbbeb6e383badfae7d082a36ac7c03a";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/comics";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

const ComicList = (props) => {
  const { pageNum } = useParams();
  const limitPerPage = 48;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [comicData, setComicData] = useState(undefined);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [invalidReq, setInvalidReq] = useState(true);
  let card = null;

  useEffect(() => {
    console.log("On loading useeffect");
    async function fetchComicData() {
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
          console.log(pages);
          setTotalPages(pages);
          setComicData(data.data.results);
          if (parseInt(pageNum) > pages) {
            setInvalidReq(true);
            setLoading(false);
            return;
          }
          setLoading(false);
          setInvalidReq(false);
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log("Invalid page number");
      }
    }
    fetchComicData();
  }, [pageNum]);

  useEffect(() => {
    console.log("search useeffect fired");
    async function fetchData() {
      try {
        let page = parseInt(pageNum);
        let offset = limitPerPage * page;
        console.log(`in fetch searchTerm : ${searchTerm}`);
        const { data } = await axios.get(
          url + "&titleStartsWith=" + searchTerm + "&limit=" + limitPerPage + "&offset=" + offset
        );
        console.log(data);
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

  const buildCard = (comics) => {
    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={comics.id}>
          <Card className={classes.card} variant="outlined">
            <CardActionArea>
              <Link to={`/comics/${comics.id}`}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  image={`${comics.thumbnail.path + "/standard_fantastic"}.${comics.thumbnail.extension}`}
                  title="show image"
                />

                <CardContent>
                  <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                    {comics.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {comics.description ? comics.description.substring(0, 139) + "..." : "No Description"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {comics.creators.items.name}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
      </>
    );
  };

  if (searchTerm) {
    card =
      searchData &&
      searchData.map((searchComic) => {
        let comic = searchComic;
        console.log(searchData);
        return buildCard(comic);
      });
  } else {
    card =
      comicData &&
      comicData.map((comic) => {
        return buildCard(comic);
      });
  }
  console.log(comicData);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    if (invalidReq) {
      return <ErrorPage />;
    } else {
      return (
        <>
          <div>
            {/* <Grid container direction="row" justifyContent="center" alignItems="center"> */}
            <article className="articleChar">
              <picture className="pictureChar">
                <source media="(min-width: 0px)" srcSet={background} />
                <img src={background} alt="background" />
              </picture>
              {/* <img className="image" src={background} alt="background" /> */}
              <h1 className="charHeader">Marvel Comics</h1>
            </article>
            {/* </Grid> */}
            <Divider />
            <SearchComic searchValue={searchValue} />
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
                  to={`/comics/page/${parseInt(pageNum) - 1}`}
                  // onClick={goToPreviousPage}
                  className={`prev ${parseInt(pageNum) === 0 ? "disabled" : ""}`}
                >
                  Previous
                </Link>
              </Button>
              {pageNum}
              <Button className="button">
                <Link
                  to={`/comics/page/${parseInt(pageNum) + 1}`}
                  // onClick={goToPreviousPage}
                  className={`prev ${parseInt(pageNum) === totalPages ? "disabled" : ""}`}
                  //   className={`next ${parseInt(pageNum) === 0 ? "disabled" : ""}`}
                >
                  Next
                </Link>
              </Button>
            </div>
          )}
        </>
      );
    }
  }
};

export default ComicList;
