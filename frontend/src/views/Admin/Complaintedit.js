import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '@material-ui/core/Slider';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Modal from '@material-ui/core/Modal';
import NavBar from "components/Header/Navbar";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
// import styles from "assets/jss/material-kit-react/views/loginPage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Loading from '../Loading';
import FormControl from '@material-ui/core/FormControl';
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

function Ecart() {
  const Home = () => {
    window.location.href = "/";
  }
  return (
    <div className="container-fluid" style={{ padding: "50px auto", margin: "40px auto",minHeight:"590px" }}>
      <Grid container  style={{minHeight:"500px"}} spacing={3}>
        <Grid item lg={1} />
        <Grid item lg={4}>
          {/* <img style={{ width: "14vw", display: "block", marginLeft: "auto", marginRight: "auto" }} src={cimg} alt="Empty-Cart" /> */}
        </Grid>
        <Grid item lg={7} style={{ textAlign: "center" }}>
          <Typography color="textPrimary" variant="h2" gutterBottom>No Compliants</Typography>
          {/* <Typography color="textSecondary" style={{ marginLeft: "38px" }} variant="h5" gutterBottom>Place Order now!</Typography> */}
          <br />
          {/* <Button variant="contained" style={{ display: "block", margin: "auto", width: "60%", backgroundColor: "#00897b" }} size="large" color="secondary" onClick={Home}> Shop Now</Button> */}
        </Grid>
      </Grid>
    </div>
  );
}

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('AdminToken');

export default function OrderDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter]= useState("ALL");
  useEffect(() => {
    if(Token)
    axios({
      method: 'get',
      url: "http://localhost:5000/complaint/",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    })
      .then(res => {

        setComplaints(res.data.complaints);
        // count = res.data.count;
        console.log(res);
        setLoading(false);
      })
  }, [])

  // const handleDelete=(e)=>{

  //   axios({
  //     method: 'delete',
  //     url: "http://localhost:5000/complaint/"+ e,
  //     headers: {
  //         'Authorization': 'Bearer '+ Token,
  //     }
  //   }).then(res=>{
  //     console.log(res);
  //     window.location.href = "/complaints";
  //   })
  // }

  let filterpro = complaints.filter(
    (e)=>{
      if(filter!="ALL"){
        console.log(filter, e.category, e.status);
      return( e.category.toUpperCase().includes(filter.toUpperCase()) && e.status.toUpperCase().includes("REGISTERED"));
      }
      else return e.category;
    }
  )

  return (
    <div>
        <div>
      {loading ? <div style={{minHeight:"660px"}}><Loading /></div> :

        <div style={{ marginTop: "10vh", padding: "24px" }} className={classNames(classes.main, classes.mainRaised)}>
          {/* <Categories/> */}
          <div style={{float: "right"}}>
            <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={filter}
          onChange={(e)=>{setFilter(e.target.value)}}
        >
          <MenuItem value={"ALL"}>All</MenuItem>
          <MenuItem value={"Water"}>Water</MenuItem>
          <MenuItem value={"Electricity"}>Electricity</MenuItem>
          <MenuItem value={"Parks"}>Parks</MenuItem>
          <MenuItem value={"Roads"}>Roads and Public Works</MenuItem>
          <MenuItem value={"Sewage"}>Sewage</MenuItem>
          <MenuItem value={"Animal Control"}>Animal Control</MenuItem>
          <MenuItem value={"Cleanliness"}>Cleanliness</MenuItem>
        </Select>
        </FormControl>
        </div>
          <h4 style={{ color: "green", marginLeft: "1vw" }} ><b>Complaints:- {filter}</b> ({filterpro.length})</h4>
         
          {filterpro.length > 0 ? (<div className={classes.container}>
            {filterpro.map(comp => (
              <div key={comp._id} style={{ margin: "2vh" }} >
                <Grid className="element" container spacing={3} >
                  {/* <Grid item xs={3} container justify="center">
                    <img style={{ height: "20vh", width: "auto",margin:"auto",padding:"auto" }} src={"https://limitless-lowlands-36879.herokuapp.com/" + pro.product.image} />
                  </Grid> */}
                  <hr />
                  <Grid item xs style={{ textAlign: "top", paddingLeft: "32px" }}>
                    {/* <Link to={"/Display/" + pro.product._id} target="_blank" style={{ fontWeight: "400", fontSize: "18px" }}>
                      {pro.product.name}
                    </Link> */}
                    <p style={{ color: "black" }}>Category: {comp.category}</p>
                    <p style={{ color: "black" }}>Status: {comp.status}</p>
                    <p style={{ color: "black" }}>{comp.text}</p>
                    {/* <Link style={{ color: "#f44336", fontWeight: "400" }} to={"/Display/" + pro.productId} target="_blank">
                      £: {pro.product.price}
                    </Link> */}

                    <br />
                    {/* <ReviewDialog  token={Token} /> */}
                  </Grid>
                </Grid>
                <hr />
              </div>
            ))}
          </div>) :
            <Ecart />}
        </div>
      }
      </div>

    </div>
  );
}