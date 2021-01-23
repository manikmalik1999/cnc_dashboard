import React , { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Snackbar, SnackbarContent } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import modalStyle from "assets/jss/material-kit-react/modalStyle.js";
import Slide from "@material-ui/core/Slide";
import Button from "components/CustomButtons/Button.js";
import MenuItem from '@material-ui/core/MenuItem';
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
  const [priority, setPriority] = React.useState(0);
  const [text,setText] = React.useState("");
  const classes = useStyles();
  const classe = usStyles();
  const [title, setTitle]= React.useState("");
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
    axios({
      method: 'post',
      url: "https://cnc-project.herokuapp.com/update",
      headers: {
          'Authorization': 'Bearer '+ props.token,
      },
      data: {
          title: title,
          text: text,
          priority: priority,
      }
    }).then(res=>{
      console.log(res) ;

      if( res.status === 201 ){
        setSnack({
          show: true,
          message: res.data.message,
          color: "red"
        })
      }
      else{
        setSnack({
          show: true,
          message: "Update Added",
          color: "Green"
        });
        window.location.href="/Admin-dash";
      }
      setOpen(false);
    });
    setOpen(false);
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
      {/* <Button style={{ backgroundColor: "#00897b", display: "inline", marginLeft: "75vw" }} variant="contained" color="primary" onClick={handleClickOpen}>
        New Complaint
      </Button> */}
      
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
            <h4>Add Updates</h4>
          </CardHeader>
          <div className={classes.socialLine}>
            </div>
          <CardBody>
            <TextField
              label="Title"
              id="title"
              type="text"
              fullWidth
              style={{ paddingBottom: '10%' }}
              InputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     {/* <Email style={{ color: "purple" }} /> */}
                //   </InputAdornment>
                // )
              }}

              value={title}
              onChange={e => { setTitle(e.target.value) }}
            />
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

      <FormControl className={classes.formControl}>  
        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          onChange={(e)=>{setPriority(e.target.value)}}
        >
          <MenuItem value={1}>Warning</MenuItem>
          <MenuItem value={2}>Advice</MenuItem>
          <MenuItem value={3}>Information</MenuItem>
        </Select>
        </FormControl>
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <div>
              <Button simple color="success" size="lg" onClick={handleSubmit}>
                Add
            </Button> 
            </div>
          </CardFooter>
        </form>
      </Dialog>
    </div>
  );
}
