import React, { useState, useEffect } from "react";

import {
  Box,
  Paper,
  Container,
  IconButton,
  Typography,
  InputBase,
  AppBar,
  Toolbar,
} from "@material-ui/core";

import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";

import { fade, makeStyles } from "@material-ui/core/styles";

import { CardWrapper } from "./Card";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "720px",
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    // margin: "5% auto",
    [theme.breakpoints.only("xs")]: {
      width: "300px",
    },
    [theme.breakpoints.only("sm")]: {
      width: "550px",
    },
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

  // const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    fetch("/companies").then((response) =>
      response.json().then((data) => {
        // console.log(data);
        setData(data.result);
      })
    );
  }, []);

  return (
    <Box>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton> */}
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
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {data.map((company, index) => {
        return <CardWrapper company={company} key={index}></CardWrapper>;
      })}
    </Box>
  );
}
