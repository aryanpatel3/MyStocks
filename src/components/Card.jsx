import React from "react";
import ErrorImage from "../error.png";

import {
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Link,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(5),
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    [theme.breakpoints.only("xs")]: {
      width: "300px",
    },
    [theme.breakpoints.only("sm")]: {
      width: "550px",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    // marginTop: "30",
  },
  animate: {
    borderRadius: 10,

    // maxHeight: "45%",
    // height: 400,
    // width: "45%",
    // position: "relative",
    margin: 20,
    overflow: "hidden",
    "& div": {
      transition: "transform .5s ease",
    },
    "&:hover": {
      "& div": {
        transform: "scale(1.02)",
      },
    },
  },
  card: {
    height: 400,
    // // position: "relative",
    // width: "45%",
    // margin: 20,
    // paddingTop: "56.25%", // 16:9,
  },
  articles: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  link: {
    color: "white",
    width: "45%",
    margin: 20,
  },
  headline: {
    color: "white",
    // position: "fixed",
  },
}));

export const CardWrapper = ({ company }) => {
  const classes = useStyles();
  console.log(ErrorImage);
  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography color="inherit" gutterBottom variant="h4">
        {company.name}
      </Typography>
      <Container className={classes.articles}>
        {/* {company.positives.map((article, index) => {
          return (
            <Link
              href={article.url}
              className={classes.link}
              variant="body2"
              key={index}
              rel="noopener"
              target="_blank"
            >
              <div className={classes.animate}>
                <Card
                  className={classes.card}
                  style={{
                    backgroundImage:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      className={classes.headline}
                    >
                      {article.headline}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Link>
          );
        })} */}
        {company.articles.map((article, index) => {
          const valid_img = article.image ? true : false;
          console.log(
            "headline = " + article.headline + " valid = " + valid_img
          );
          return (
            <Link
              href={article.url}
              className={classes.link}
              variant="body2"
              key={index}
              rel="noopener"
              target="_blank"
            >
              <div className={classes.animate}>
                <Card
                  className={classes.card}
                  style={{
                    backgroundImage: valid_img
                      ? "url(" + article.image + ")"
                      : "url(" + ErrorImage + ")",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h2"
                      className={classes.headline}
                    >
                      {article.headline}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Link>
          );
        })}
      </Container>
    </Paper>
  );
};
