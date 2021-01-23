import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
// @material-ui/icons

// core components

import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/AdminOutput.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import NavBar from "components/Header/adminNav";
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import { Snackbar, SnackbarContent } from "@material-ui/core";
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
    return (

      <div className="container-fluid" style={{ padding: "50px auto", margin: "100px auto",minHeight:"590px" }}>
        <Grid container  style={{minHeight:"500px"}} spacing={3}>
          {/* <Grid item lg={1} /> */}
          <Grid item lg={7} style={{ alignSelf: "center" }}>
          <LockIcon color ="primary" style={{fontSize: 200, marginLeft: "40vw" , }}/>
            {/* <Typography color="textPrimary" variant="h2" gutterBottom>Please Login !!</Typography> */}
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
  const [auth, setAuth]= useState(0); 
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    color: "lightBlue"
  })

  useEffect(() => {
          axios({
            method: 'get',
            url: "https://cnc-project.herokuapp.com/admin/",
            headers: {
              'Authorization': 'Bearer ' + token,
            }

          }).then(res => {
            console.log(res);
            if(res.data.status === 200){
              setAuth(1); 
              setSnack({
                show: true,
                message: res.data.message,
                color: "green"
              })
            }
            else {
              setSnack({
                show: true,
                message: "Please login",
                color: "#f4c430"
              })
            }

          })

  }, [])

  const snackbarClose = (event) => {
    setSnack({
      show: false
    })
  }

  return (
    <div>
      <NavBar />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snack.show}
        autoHideDuration={5000}
        onClose={snackbarClose}
        bodystyle={{ backgroundColor: 'teal', color: 'coral' }}
        message={<span id="message-id">{snack.message}</span>}
      >
        <SnackbarContent style={{
          backgroundColor: snack.color,
        }}
          action={[
            <button key={"close"} onClick={snackbarClose} style={{ background: "none", border: "none", color: "white" }}>x</button>
          ]}
          message={<span id="client-snackbar">{snack.message}</span>}
        />
      </Snackbar>

  { auth ?
      <div style={{ marginTop: "10vh" }}>
        <Categories />
        <Paper square>
        
        </Paper>
    </div>
    : <Ecart/>
      }

    {/* <Footer /> */}

    </div >
  );
}
