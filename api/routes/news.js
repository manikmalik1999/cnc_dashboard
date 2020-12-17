const express = require('express');
const router = express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('40a5389e20334ad6bb54de42b0ded7c7');
var d = new Date();

var month = d.getUTCMonth() + 1; //months from 1-12
var day = d.getUTCDate();
var year = d.getUTCFullYear();
var to = year+'-'+month+'-'+day; 
if(day===2 && month!= 1){day = 28; month--;}
else if(day ===2 && month ===1){ day = 30; year--; month=12; }
else day-=2; 

var from = year+'-'+month+'-'+day;
// console.log(to, from); 
router.get("/", (req, res, next)=>{

    newsapi.v2.everything({
        q: 'Chandigarh',  
        domains: 'timesofindia.indiatimes.com, tribuneindia.com, indianexpress.com, hindustantimes.com',
        from: from,
        to: to,
        language: 'en',
        sortBy: 'relevancy',
        page: 2
      }).then(response => {
        // console.log(response);
        res.json({news: response}).status(200);
      }) .catch(err=>{
        console.log(err); 
        res.json({error: err}).status(500);
      });
});

module.exports = router;