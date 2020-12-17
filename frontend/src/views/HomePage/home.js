import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components

import Footer from "components/Footer/Footer.js";
import Categories from "components/Header/CategoryBar.js"

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
//import ProductSection from "./Sections/ProductSection.js";
import NavBar from "components/Header/Navbar"
// import TeamSection from "./Sections/TeamSection.js";
// import WorkSection from "./Sections/WorkSection.js";
//import Parallax from "components/Parallax/Parallax.js";
//import parallaxStyle from "assets/jss/material-kit-react/components/parallaxStyle.js";
// import { MyCarousel, Caro, Mul, Spec } from "./Sections/CardCarousel";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
import Paper from '@material-ui/core/Paper';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import elec from 'assets/img/Electronics.jpg';
// import fashion from 'assets/img/fashion.jpg';
// import sports from 'assets/img/sports.png';
// import ent from 'assets/img/Entertainment.jpg';
// import strip from 'assets/img/strip.webp';
// import suit from 'assets/img/suit.png';
// import chair from 'assets/img/chairs.jpg';
// import fri from 'assets/img/fridge.jpg';
// import tt from 'assets/img/turntable.jpg';
// import tele from 'assets/img/tele.jpg';
// import { Link } from "react-router-dom";
// import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import CardHeader from '@material-ui/core/CardHeader';
import CardBody from "components/Card/CardBody.js";

const dashboardRoutes = [];

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

export default function LandingPage(props) {
  const classes = useStyles();
  const classe = usStyles();
  //const clas = usStyles();
  const { ...rest } = props;
//   const [shad1, setShad1] = useState(0);
//   const onMouseOver1 = () => {
//     console.log('yup');
//     setShad1(3);
//   }
//   const onMouseOut1 = () => setShad1(0);
//   const [shad2, setShad2] = useState(0);
//   const onMouseOver2 = () => {
//     console.log('yup');
//     setShad2(3);
//   }
//   const onMouseOut2 = () => setShad2(0);
//   const [shad3, setShad3] = useState(0);
//   const onMouseOver3 = () => {
//     console.log('yup');
//     setShad3(3);
//   }
//   const onMouseOut3 = () => setShad3(0);
//   const [shad4, setShad4] = useState(0);
//   const onMouseOver4 = () => {
//     console.log('yup');
//     setShad4(3);
//   }
//   const onMouseOut4 = () => setShad4(0);
//   const [shad5, setShad5] = useState(0);
//   const onMouseOver5 = () => {
//     console.log('yup');
//     setShad5(3);
//   }
//   const onMouseOut5 = () => setShad5(0);
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "10vh" }}>
        <Categories />
        <Paper square>

        </Paper>
    </div>

    <Footer />

    </div >
  );
}
