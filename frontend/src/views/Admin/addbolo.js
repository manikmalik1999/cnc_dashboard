import React , { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme)=>({
  root: {
    width: 500,
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
  const usStyles = makeStyles(modalStyle);


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [text,setText] = React.useState("");
  const classes = useStyles();
  const classe = usStyles();
  const [image, setImage]= React.useState([]);
  const [snack, setSnack] = useState({
    show: false,
    message: "",
    color: "lightBlue"
  })
  const handleClickOpen = () => {
    setOpen(true);
  };
  const snackbarClose = (event) => {
    setSnack({
      show: false
    })
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit= (e)=>{
    
    let msg = [];
    if (!text) {
      msg.push("name");
    }
    if (!title) {
      msg.push("description");
    }
    if (image.length !== 1) {
      msg.push("exactly 1 image ");
    }
    if (msg.length !== 0) {
      console.log(msg) ;
      let finalMsg = "" ;
      if (msg.length === 1) {
        if(msg[0] === "exactly 1 Image"){
          finalMsg = "Please enter " ;
        } else {
          finalMsg = "Please enter a valid " ;
        }
        finalMsg = finalMsg + msg[0]  ;
      } else {
        finalMsg = "Please enter a valid ";
        for (let i = 0; i < msg.length; ++i) {
          finalMsg = finalMsg + msg[i];
          if (i < msg.length - 2) {
            finalMsg = finalMsg + ",  ";
          }
          if (i === msg.length - 2) {
            finalMsg = finalMsg + "  and  ";
          }
        }
      }
      setSnack({
        show: true,
        message: finalMsg,
        color: "red"
      })
      // console.log(finalMsg);
    }
    else {
      console.log("entering");
      var formData = new FormData()
      formData.append('boloImage', image[0]);
      formData.append('title', title);
      formData.append('text', text);
      console.log(formData);
      axios({
        method: 'post',
        url: "http://localhost:5000/bolo",
        data: formData,
        headers: {
          'Authorization': 'Bearer ' + props.token,
          'Content-Type': 'multipart/form-data'
        },
      }).then(res => {
        // setResponse(res.status);
        setSnack({
          show: true,
          message: "BOLO Added",
          color: "green"
        })
      })
        .catch(err => {
          setSnack({
            show: true,
            message: "Server Didn't Respond, Try again Later",
            color: "red"
          })
          console.log(err);
        })
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snack.show}
        autoHideDuration={2000}
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
      <IconButton style={{ display: "inline", marginLeft: "75vw" }} color="primary" onClick={handleClickOpen} aria-label="delete" >
                      <AddCircleIcon style={{fontSize: "2.5vw"}} />
      </IconButton>
      <Dialog
        classes={{
          root: classe.center,
          paper: classe.modal
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description">
        <form style={{marginTop:"5vh"}}className={classes.form}>
        
          <CardHeader color="success" className={classes.cardHeader}>
            <h4>Add new lookout</h4>
          </CardHeader>
          <div className={classes.socialLine}>
            </div>
          <CardBody>
          <FormControl className={classes.formControl}> 
          <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
          >
            <MenuItem value={"WANTED"}>WANTED</MenuItem>
            <MenuItem value={"MISSING"}>MISSING</MenuItem>
            <MenuItem value={"BEWARE"}>BEWARE</MenuItem>
          </Select>
          </FormControl>
            <TextField
              label="Details"
              id="text"
              type="text"
              fullWidth
              style={{ paddingBottom: '10%' }}
              InputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <LockIcon style={{ color: "purple" }} />
                //   </InputAdornment>
                // )
              }}
              value={text}
              onChange={e => { setText(e.target.value) }}
            />
              <div className="form-group">
                        <input type="file" onChange={e => { setImage(e.target.files) }} />
              </div>
          </CardBody>
          <CardFooter className={classes.cardFooter}>
          <div>
              <Button simple color="success" size="lg"style={{color: "#66bb6a"}} onClick={handleSubmit}>
                Add
            </Button> 
            </div>
          </CardFooter>
        </form>
      </Dialog> 
    </div>
  );
}
