import React , { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Snackbar, SnackbarContent } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles({
    root: {
      width: 400,
      display: 'flex',
      alignItems: 'center',
    },
  });


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [comments,setComments] = React.useState("");
  const classes = useStyles();
  const [address, setAddress]= React.useState("");
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
      url: "http://localhost:5000/complaint",
      headers: {
          'Authorization': 'Bearer '+props.token,
      },
      data: {
          category:category,
          text: comments,
          address: address,
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
          message: "Complaint Initiated",
          color: "Green"
        })
      }
      setOpen(false);
    });
    setOpen(false);
    setComments("");
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
      <Button style={{ backgroundColor: "#00897b", display: "inline", marginLeft: "75vw" }} variant="contained" color="primary" onClick={handleClickOpen}>
        New Complaint
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Initiate a New Complaint</DialogTitle>
        <DialogContent>
        <div className={classes.root}>
          {/* <DialogContentText>
            Category
          </DialogContentText> */}
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(e)=>{setCategory(e.target.value)}}
        >
          <MenuItem value={"Water"}>Water</MenuItem>
          <MenuItem value={"Electricity"}>Electricity</MenuItem>
          <MenuItem value={"Animal Control"}>Animal Control</MenuItem>
          <MenuItem value={"Roads"}>Roads and Public Works</MenuItem>
          <MenuItem value={"Parks"}>Parks</MenuItem>
          <MenuItem value={"Sewage"}>Sewage</MenuItem>
          <MenuItem value={"Cleanliness"}>Cleanliness</MenuItem>
        </Select>
          {/* <TextField value={comments} id="standard-basic" label="Your views" fullWidth onChange={(e)=>{setComments(e.target.value)}}/> */}
        </div>
          <br/>
          <br/>
          {/* <DialogContentText>
            Description
          </DialogContentText> */}
          <TextField value={comments} id="standard-basic" label="Describe your complaint" fullWidth onChange={(e)=>{setComments(e.target.value)}}/>
          <TextField value={address} id="standard-basic" label="Address" fullWidth onChange={(e)=>{setAddress(e.target.value)}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
