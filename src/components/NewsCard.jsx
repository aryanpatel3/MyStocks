import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Button } from "@material-ui/core";

import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { Row } from "@mui-treasury/components/flex";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import ErrorImage from "../error.png";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "10px 0 50px 0",
    minWidth: 420,
    width: 100,
    height: "auto",
    maxHeight: 600,
    position: "relative",
    boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)",
    overflow: "visible",
    borderRadius: "1.5rem",
    transition: "0.4s",
    "&:hover": {
      transform: "translateY(-2px)",
      "& $shadow": {
        bottom: "-1.5rem",
      },
      "& $shadow2": {
        bottom: "-2.5rem",
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      zIndex: 0,
      display: "block",
      width: "100%",
      bottom: -1,
      height: "100%",
      borderRadius: "1.5rem",
      backgroundColor: "rgba(0,0,0,0.08)",
    },
  },
  main: {
    overflow: "hidden",
    borderTopLeftRadius: "1.5rem",
    borderTopRightRadius: "1.5rem",
    zIndex: 1,
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      display: "block",
      width: "100%",
      height: "100%",
      // background: "linear-gradient(to top, #014a7d, rgba(0,0,0,0))",
    },
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    position: "absolute",
    bottom: 0,
    // width: "100%",
    zIndex: 1,
    padding: "1.5rem 1.5rem 1rem",
  },
  avatar: {
    width: 48,
    height: 48,
  },
  tag: {
    display: "inline-block",
    fontFamily: "'Sen', sans-serif",
    borderRadius: "0.5rem",
    padding: "2px 0.5rem",
    color: "#fff",
    marginBottom: "0.5rem",
    boxShadow: "0px 2px 5px -2px #000",
  },
  positive: {
    background: "linear-gradient(to right, #4caf50, #388e3c)",
  },
  negative: {
    background: "linear-gradient(to right, #f44336, #d32f2f)",
  },
  title: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "2rem",
    fontWeight: 800,
    color: "#fff",
  },
  author: {
    display: "block",
    zIndex: 1,
    position: "relative",
    borderBottomLeftRadius: "1.5rem",
    borderBottomRightRadius: "1.5rem",
  },
  shadow: {
    transition: "0.2s",
    position: "absolute",
    zIndex: 0,
    width: "88%",
    height: "100%",
    bottom: 0,
    borderRadius: "1.5rem",
    backgroundColor: "rgba(0,0,0,0.06)",
    left: "50%",
    transform: "translateX(-50%)",
  },
  shadow2: {
    bottom: 0,
    width: "72%",
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  button: {
    background: "linear-gradient(to right, #00b4db, #0083b0)",
    boxShadow: "0px 4px 32px rgba(0, 180, 219, 0.3)",
    marginTop: 10,
  },
}));

export const NewsCard = React.memo(function News3Card(props) {
  const styles = useStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const { button: buttonStyles } = useBlogTextInfoContentStyles();

  const article = props.article;
  const score = Math.round((article.score + Number.EPSILON) * 100) / 10;

  return (
    <>
      {/* <NoSsr>
        <GoogleFontLoader fonts={[{ font: "Sen", weights: [400, 800] }]} />
      </NoSsr> */}
      <Card className={styles.card}>
        <Box className={styles.main} minHeight={300} position={"relative"}>
          <CardMedia
            classes={mediaStyles}
            image={article.image || ErrorImage}
          />
          <div className={styles.content}>
            <div
              className={
                score > 0
                  ? `${styles.tag} ${styles.positive}`
                  : `${styles.tag} ${styles.negative}`
              }
            >{`Sentiment: ${score}/10`}</div>
            {/* <Typography variant={"h2"} className={styles.title}>
              {article.headline}
            </Typography> */}
          </div>
        </Box>
        <Row
          className={styles.author}
          m={0}
          p={3}
          pt={2}
          gap={2}
          bgcolor={"common.white"}
        >
          <TextInfoContent
            useStyles={useN01TextInfoContentStyles}
            overline={article.date}
            heading={article.headline}
            body={article.snippet}
          />
          <Button
            className={`${buttonStyles} ${styles.button}`}
            href={article.url}
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </Button>
        </Row>
        <div className={styles.shadow} />
        <div className={`${styles.shadow} ${styles.shadow2}`} />
      </Card>
    </>
  );
});
export default NewsCard;
