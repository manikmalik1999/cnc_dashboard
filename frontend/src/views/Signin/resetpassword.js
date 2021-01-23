import React, { useState } from "react";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

// core components

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function ResetPass(props) {

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
//   const { ...rest } = props;
  const token= props.match.params.token;
  const [password, setPassword] = useState("");

  function handleSubmit(e){
    
    axios({
        method: 'post',
        url: "http://localhost:5000/users/resetPass/",
        headers: {}, 
        data: {
            token: token,
            password: password
        }
      }).then(res =>{
            alert(res.data.message);
           window.location.href = "/";
        })
}


  return (
    <div>
     
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Change Password</h4>
                  </CardHeader>
                  <CardBody>
                <TextField
                      label="New password"
                      id="pass"
                      type="password"
                      fullWidth
                      style={{paddingBottom:'5%'}}
                      endadornment= {
                        <InputAdornment position="end">
                           <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                        </InputAdornment>
                      }
                      value ={password}
                      onChange={e =>{setPassword(e.target.value)}}  
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleSubmit}>
                     Change Password
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
