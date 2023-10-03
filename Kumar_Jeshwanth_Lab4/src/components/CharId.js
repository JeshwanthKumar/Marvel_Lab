import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  CircularProgress,
  Button,
} from "@material-ui/core";
import "../App.css";
import ErrorPage from "./ErrorPage";

const md5 = require("blueimp-md5");
const publickey = "ac016025143dcfda2f4f0f8ae4318fcd";
const privatekey = "20d4987a8dbbeb6e383badfae7d082a36ac7c03a";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters/";
const authUrl = "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

const useStyles = makeStyles({
  card: {
    maxWidth: 550,
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

const Character = (props) => {
  const { id } = useParams();
  const [charData, setCharData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [invalidReq, setInvalidReq] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    console.log("Useeffect fired");
    async function fetchData() {
      try {
        if (parseInt(id) < 0 || typeof parseInt(id) !== "number" || isNaN(parseInt(id))) {
          setInvalidReq(true);
          setLoading(false);
          return;
        }
        try {
          const { data } = await axios.get(baseUrl + `/${id}` + authUrl);
          console.log(data.data.results);
          setCharData(data.data.results[0]);
          setLoading(false);
          setInvalidReq(false);
        } catch (e) {
          setInvalidReq(true);
          setLoading(false);
          return;
          console.log(e);
        }
      } catch (e) {
        console.log("Invalid request");
      }
    }
    fetchData();
  }, [id]);

  let description = null;
  if (charData && charData.description) {
    description = charData && charData.description.replace("");
  } else {
    description = "No Description";
  }

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
        <Card className={classes.card} variant="outlined">
          <CardHeader className={classes.titleHead} />
          <CardMedia
            className={classes.media}
            component="img"
            image={`${charData.thumbnail.path + "/standard_fantastic"}.${charData.thumbnail.extension}`}
            title="show image"
          ></CardMedia>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="span">
              <dl>
                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                  {charData.name}
                </Typography>
                <p>
                  <dt className="title">Comics:</dt>
                  {charData && charData.comics.items.name ? <dd>{charData.comics.items.name}</dd> : <dd>N/A</dd>}
                </p>
                <p>
                  <dt className="title">Description:</dt>
                  <dd>{description}</dd>
                </p>
              </dl>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
              >
                Back
              </Button>
              {/* <Link to="/characters/page/0">Back to all characters...</Link> */}
            </Typography>
          </CardContent>
        </Card>
      );
    }
  }
};

export default Character;
