const comp = require('../models/complaints');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const checkAuth = require("../middleware/check-auth");


// Handle incoming GET requests to /complaint
router.get('/', (req, res, next) => {
  comp.find()
  .select()
  .populate('userId', 'name _id')
  .exec()
  .then(docs =>{
      res.status(200).json({
          count: docs.length,
          reviews: docs
      });
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      });
  });
});

router.get('/mycomplaint', checkAuth, (req, res, next) => {
    const {userId}= req.userData;
    comp.find({userId: userId})
    .select()
    .populate('userId', 'name _id')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            complaints: docs
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
  });

router.post('/',checkAuth, (req, res, next) => {

    const {userId}= req.userData;  
    const complaint = new comp({
                _id: mongoose.Types.ObjectId(),
                category: req.body.category,
                userId: userId,
                address: req.body.address,
                text: req.body.text
     })
    complaint.save() 
    .then(result=>{
                res.status(200).json({
                    message:"Complaint Registered"
                })
            })
    .catch(err=>{
        // console.log(err);
        res.status(201).json({
            message:"Error occured",
            error: err
        });
    });

    });



    router.get('/:category', (req, res, next) => {
        const cat = req.params.category;
        
        comp.find({category: cat})
        .select('')
        .populate('userId','name')
        .exec()
        .then(complaint =>{
            console.log(complaint);
            if(!complaint){
                return res.status(404).json({
                    message: "No complaints Yet"
                });
            }
            res.status(200).json({
                result: complaint
            })
        })
            .catch(err=>{
                res.status(500).json({
                    error: err
                });
            });
        
          });

router.delete('/:complaintId',checkAuth,(req, res, next) => {
    comp.remove({_id: req.params.complaintId}).exec()
    .then(result=>{
        res.status(200).json({
            message: "Complaint Deleted",
            
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });
    });

module.exports = router;