import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons

// core components

import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/AdminOutput.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import NavBar from "components/Header/adminNav";
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';

const dashboardRoutes = [];
const token= sessionStorage.getItem('AdminToken');
const useStyles = makeStyles(styles);
//const usStyles = makeStyles(parallaxStyle)
const usStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Ecart() {
    const Home = () => {
      window.location.href = "/";
    }
    return (
      <div className="container-fluid" style={{ padding: "50px auto", margin: "100px auto",minHeight:"590px" }}>
        <Grid container  style={{minHeight:"500px"}} spacing={3}>
          <Grid item lg={1} />
          <Grid item lg={4}>
            {/* <img style={{ width: "14vw", display: "block", marginLeft: "auto", marginRight: "auto" }} src={cimg} alt="Empty-Cart" /> */}
          </Grid>
          <Grid item lg={7} style={{ textAlign: "center" }}>
            <Typography color="textPrimary" variant="h2" gutterBottom>Please Login !!</Typography>
            {/* <Typography color="textSecondary" style={{ marginLeft: "38px" }} variant="h5" gutterBottom>Place Order now!</Typography> */}
            <br />
            {/* <Button variant="contained" style={{ display: "block", margin: "auto", width: "60%", backgroundColor: "#00897b" }} size="large" color="secondary" onClick={Home}> Shop Now</Button> */}
          </Grid>
        </Grid>
      </div>
    );
  }
export default function LandingPage(props) {
  const classes = useStyles();
  const classe = usStyles();
  const { ...rest } = props;

  return (
    <div>
      <NavBar />
      {token ?
      <div style={{ marginTop: "10vh" }}>
        <Categories />
        <Paper square>
        </Paper>
    </div>
    : 
    <Ecart/>
    }
    <Footer />

    </div >
  );
}
