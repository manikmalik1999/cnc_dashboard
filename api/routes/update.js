const update = require('../models/updates');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const checkAuth = require("../middleware/check-auth");

router.get('/', (req, res, next) => {
    update.find()
    .select()
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            updates: docs
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
  });

  router.post('/',checkAuth, (req, res, next) => {
  
      const newUpdate = new update({
                  _id: mongoose.Types.ObjectId(),
                  priority: req.body.priority,
                  title: req.body.title,
                  text: req.body.text
       })
      newUpdate.save() 
      .then(result=>{
                  res.status(200).json({
                      message:"Update added"
                  })
              })
      .catch(err=>{
          console.log(err);
          res.status(500).json({
              error: err
          });
      });
  
      });
  
  
  router.delete('/:updateId',checkAuth, (req, res, next) => {
    update.remove({_id: req.params.updateId}).exec()
      .then(result=>{
          res.status(200).json({
              message: "Update Removed",

          })
      })
      .catch(err=>{
          res.status(500).json({
              error: err
          });
      });
      });
  
  module.exports = router;