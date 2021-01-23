import Loading from '../Loading';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import ReviewDialog from './addbolo.js';
let count =0;

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('AdminToken');

export default function OrderDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [bolo, setbolo] = useState([]);

  useEffect(() => {
    count++; 
    console.log(count);
    axios({
      method: 'get',
      url: "https://cnc-project.herokuapp.com/bolo",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    })
      .then(res => {
        setbolo(res.data.bolos);
        console.log(res);
        setLoading(false);
      })
  }, [])
const imageClick=(e)=>{
    window.open("https://cnc-project.herokuapp.com/"+ e);
}

const handleDelete=(e)=>{

  axios({
    method: 'delete',
    url: "https://cnc-project.herokuapp.com/bolo/"+ e,
    headers: {
        'Authorization': 'Bearer '+ Token,
    }
  }).then(res=>{
    alert(res.data.message);
    console.log(res);
  //  useEffect();
    // setLoading (false);
  })
}



  return (
    <div>
        <div>
      {loading ? <div style={{minHeight:"660px"}}><Loading /></div> :
        <div style={{ marginTop: "10vh", padding: "24px" }} className={classNames(classes.main, classes.mainRaised)}>
          {/* <Categories/> */}
          {/* <h4 style={{ color: "green", marginLeft: "1vw" }} ><b></b> ({count})</h4> */}
          <ReviewDialog  token={Token} />
          <div className={classes.container}>
            {bolo.map(comp => (
              <div key={comp._id} style={{ margin: "2vh" }} >
                <Grid className="element" container spacing={3} >
                  <Grid item xs={3} container justify="center">
                    <img onClick ={()=>imageClick(comp.image)} style={{ height: "20vh", width: "auto",margin:"auto",padding:"auto" }} src= {"https://cnc-project.herokuapp.com/"+ comp.image} />
                  </Grid>
                  <hr />
                  <Grid item xs={6} style={{ textAlign: "top", paddingLeft: "32px" }}>
                  <h2 style={{ color: "Red" }}>{comp.title}</h2>
                    <p style={{ color: "black" }}>{comp.text}</p>
                    <br />
                  </Grid>
                  <Grid item xs={3}>
                  <IconButton style={{ marginLeft: "10vw" }} color="primary" onClick={()=>handleDelete(comp._id)} aria-label="delete" >
                                    <DeleteIcon style={{fontSize: "2.5vw"}} />
                    </IconButton>
                  </Grid>
                </Grid>
                <hr />
              </div>
            ))}
          </div>
        </div>
      }
      </div>

    </div>
  );
}