import React from "react";
import NewsCard from "./NewsCard";

import { Paper, Typography, Container } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "50px auto",
    backgroundColor: "white",
    maxWidth: "1000px",
    // boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    padding: "25px",
    // transform: "scale(0.67)",
    // transformOrigin: "0 0",
    // [theme.breakpoints.only("xs")]: {
    //   width: "300px",
    // },
    // [theme.breakpoints.only("sm")]: {
    //   width: "550px",
    // },
  },
  articles: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 0,
  },
  name: {
    textTransform: "uppercase",
  },
  group: {
    padding: "30px",
    margin: "10px 0",
  },
  positive: {
    boxShadow: "0px 0px 5px #388e3c",
  },
  negative: {
    boxShadow: "0px 0px 5px #d32f2f",
  },
}));

export const CardWrapper = ({ company }) => {
  const classes = useStyles();

  // console.log(ErrorImage);
  return (
    <Paper elevation={6} className={classes.paper}>
      <Typography
        color="inherit"
        gutterBottom
        variant="h4"
        className={classes.name}
      >
        {company.name}
      </Typography>
      <Container className={classes.articles}>
        <Paper className={`${classes.group} ${classes.positive}`}>
          {company.positives.map((article, index) => {
            return <NewsCard article={article} key={index}></NewsCard>;
          })}
        </Paper>
        <Paper className={`${classes.group} ${classes.negative}`}>
          {company.negatives.map((article, index) => {
            return <NewsCard article={article} key={index}></NewsCard>;
          })}
        </Paper>
      </Container>
    </Paper>
  );
};
