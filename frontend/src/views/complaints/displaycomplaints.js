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
import Button from '@material-ui/core/Button';
import Footer from "components/Footer/Footer.js";
import cimg from 'assets/img/empty_cart.png';

// import styles from "assets/jss/material-kit-react/views/loginPage.js";
// nodejs library that concatenates classes
import classNames from "classnames";
import Loading from '../Loading';

// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import ReviewDialog from './addcomplaints.js';

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
          <Typography color="textPrimary" variant="h2" gutterBottom>You Don't have any Compaliants</Typography>
          {/* <Typography color="textSecondary" style={{ marginLeft: "38px" }} variant="h5" gutterBottom>Place Order now!</Typography> */}
          <br />
          {/* <Button variant="contained" style={{ display: "block", margin: "auto", width: "60%", backgroundColor: "#00897b" }} size="large" color="secondary" onClick={Home}> Shop Now</Button> */}
        </Grid>
      </Grid>
    </div>
  );
}

const dashboardRoutes = [];
let count = 0;
const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('TokenKey');

export default function OrderDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if(Token)
    axios({
      method: 'get',
      url: "https://cnc-project.herokuapp.com/complaint/mycomplaint",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    })
      .then(res => {
        if (res.data.status === 401) {
        sessionStorage.removeItem('TokenKey');
        sessionStorage.removeItem('name');
        window.location.href = "/";
        }
        setComplaints(res.data.complaints);
        count = res.data.count;
        console.log(res);
        setLoading(false);
      })
  }, [])

  const handleDelete=(e)=>{

    axios({
      method: 'delete',
      url: "https://cnc-project.herokuapp.com/complaint/"+ e,
      headers: {
          'Authorization': 'Bearer '+ Token,
      }
    }).then(res=>{
      console.log(res);
      window.location.href = "/complaints";
    })
  }

  return (
    <div>
      <NavBar/>
        <div>
      {loading ? <div style={{minHeight:"660px"}}><Loading /></div> :
        <div style={{ marginTop: "10vh", padding: "24px" }} className={classNames(classes.main, classes.mainRaised)}>
          {/* <Categories/> */}
         <ReviewDialog  token={Token} />
          <h4 style={{ color: "green", marginLeft: "1vw" }} ><b>My Complaints</b> ({count})</h4>
         
          {count > 0 ? (<div className={classes.container}>
            {complaints.map(comp => (
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
                    <Button  style={{ backgroundColor: "#00897b", display: "inline", marginLeft: "65vw" }} variant="contained" color="primary" onClick={()=>handleDelete(comp._id)}>
                     Retract Complaint
                     </Button>
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