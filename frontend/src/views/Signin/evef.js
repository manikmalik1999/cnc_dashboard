import React from "react";
import axios from "axios";
export default function Emailverify(props){
    const token= props.match.params.token;
    console.log(token);
    axios({
        method: 'post',
        url: "https://cnc-project.herokuapp.com/users/verify/",
        headers: {}, 
        data: {
            token: token
        }
      }).then(res =>{
            alert(res.data.message);
           const token = res.data.token;
           sessionStorage.setItem('TokenKey', token);
           window.location.href = "/login-page";
        })
        return(
            <div>
                <h3 style={{justify: "center"}}>Please Wait</h3>
            </div>
        )
}
