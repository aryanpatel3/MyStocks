import React, { useState, useEffect } from "react";

import {
  Box,
  Backdrop,
  CircularProgress,
  Paper,
  Container,
  Typography,
  InputBase,
  AppBar,
  Toolbar,
} from "@material-ui/core";

import { Search as SearchIcon } from "@material-ui/icons";

import { fade, makeStyles } from "@material-ui/core/styles";

import { CardWrapper } from "./Card";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "720px",
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    margin: "0 auto",
    marginTop: 50,
  },
  container: {
    // transform: "scale(0.5)",
    // transformOrigin: "0 0",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const [hasError, setErrors] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const filteredData = data.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetch("/companies").then((response) =>
      response
        .json()
        .then((data) => setData(data.result))
        .catch((err) => setErrors(err))
    );
    setLoading(false);
  }, []);

  function handleSearchChange(e) {
    setSearch(e.target.value.split(" ").join(""));
  }

  return (
    <Box>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              My Stocks
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <Container className={classes.container}>
        {isLoading ? (
          <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : !hasError ? (
          filteredData.map((company, index) => {
            return <CardWrapper company={company} key={index}></CardWrapper>;
          })
        ) : (
          <Paper className={classes.paper}>
            There was a problem loading this page. Please refresh to try again.
          </Paper>
        )}
      </Container>
    </Box>
  );
}
