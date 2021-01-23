import Loading from '../Loading';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import classNames from "classnames";
import DeleteIcon from '@material-ui/icons/Delete';
import ReviewDialog from './addUpdate.js';
// @material-ui/core components

// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-react/views/landingPage.js";

// function Ecart() {
//   const Home = () => {
//     window.location.href = "/";
//   }
//   return (
//     <div className="container-fluid" style={{ padding: "50px auto", margin: "40px auto",minHeight:"590px" }}>
//       <Grid container  style={{minHeight:"500px"}} spacing={3}>
//         <Grid item lg={1} />
//         <Grid item lg={4}>
//           <img style={{ width: "14vw", display: "block", marginLeft: "auto", marginRight: "auto" }} src={cimg} alt="Empty-Cart" />
//         </Grid>
//         <Grid item lg={7} style={{ textAlign: "center" }}>
//           <Typography color="textPrimary" variant="h2" gutterBottom>Your Orders Look Empty</Typography>
//           <Typography color="textSecondary" style={{ marginLeft: "38px" }} variant="h5" gutterBottom>Place Order now!</Typography>
//           <br />
//           <Button variant="contained" style={{ display: "block", margin: "auto", width: "60%", backgroundColor: "#00897b" }} size="large" color="secondary" onClick={Home}> Shop Now</Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

const dashboardRoutes = [];
const useStyles = makeStyles(styles);
const Token = sessionStorage.getItem('AdminToken');

export default function OrderDisplay(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://localhost:5000/update",
      headers: {
        'Authorization': 'Bearer ' + Token,
      }
    })
      .then(res => {
        setUpdate(res.data.updates);
        console.log(res);
        setLoading(false);
      })
  }, [])
  
  const handleDelete=(e)=>{

    axios({
      method: 'delete',
      url: "http://localhost:5000/update/"+ e,
      headers: {
          'Authorization': 'Bearer '+ Token,
      }
    }).then(res=>{
      console.log(res);
      window.location.href = "/Admin";
    })
  }
  update.sort(
      (a,b)=>
         parseInt(a.priority)- parseInt(b.priority)
  );

  return (
    <div>
        <div>
      {loading ? <div style={{minHeight:"660px"}}><Loading /></div> :
        <div style={{ marginTop: "1%", padding: "1vw" }} className={classNames(classes.main, classes.mainRaised)}>
          {/* <Categories/> */}
          {/* <h4 style={{ color: "green", marginLeft: "1vw" }} ><b></b> ({count})</h4> */}
         <ReviewDialog  token={Token} />
          <div className={classes.container}>
            {update.map(comp => (
              <div key={comp._id} style={{ margin: "2vh" }} >
                <Grid className="element" container spacing={3} >
                  {/* <Grid item xs={3} container justify="center">
                    <img style={{ height: "20vh", width: "auto",margin:"auto",padding:"auto" }} src={comp.urlToImage} />
                  </Grid> */}
                  <hr />
                  <Grid item xs style={{ textAlign: "top", paddingLeft: "32px" }}>
                    {/* <a href={comp.url} target="_blank" style={{ fontWeight: "400", fontSize: "18px" }}>
                      {comp.title}
                    </a> */}
                   {comp.priority==1 ? <h2 style={{ color: "Red" }}>{comp.title}</h2> : <h2 style={{ color: "#FFBF00" }}>{comp.title}</h2>}
                    <p style={{ color: "black" }}>{comp.text}</p>
                    {/* <Button  style={{ backgroundColor: "#00897b", display: "inline", marginLeft: "65vw" }} variant="contained" color="primary" onClick={()=>handleDelete(comp._id)}>
                    <DeleteIcon/>
                     </Button> */}
                    <IconButton style={{ display: "inline", marginLeft: "60vw" }} color="primary" onClick={()=>handleDelete(comp._id)} aria-label="delete" >
                      <DeleteIcon style={{fontSize: "2.5vw"}} />
                    </IconButton>
                    {/* <Link style={{ color: "#f44336", fontWeight: "400" }} to={"/Display/" + pro.productId} target="_blank">
                      £: {pro.product.price}
                    </Link> */}
                    <br />
                    
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