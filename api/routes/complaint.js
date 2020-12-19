const comp = require('../models/complaints');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const checkAuth = require("../middleware/check-auth");
const Sgmail= require('@sendgrid/mail');
Sgmail.setApiKey('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');

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

    const {userId, email, name}= req.userData;  
    
    const complaint = new comp({
                _id: mongoose.Types.ObjectId(),
                category: req.body.category,
                userId: userId,
                address: req.body.address,
                text: req.body.text
     })
    complaint.save() 
    .then(result=>{
            const msg= {
                to: email,
                from: process.env.EMAIL_ID,
                subject: 'Complaint Registered',
                html: `
                    <p>Dear <b>${name}</b></p>
                    <p>Your request has been registered. Your complaint ID is "${result._id}"
                    
                    Our team is currently processing your request. We will get in touch with you soon.</p>
                    <p>Thanks and Regards</p>
                    <p>Team CnC<p>
                `
            }
            Sgmail.send(msg, function(err, info){
                if(err){console.log("email not sent please check error: "+ err);
                        }
                else {console.log("email sent successfully");
                    }
            });

                res.status(200).json({
                    message:"Complaint Registered"
                })
            
            })
    .catch(err=>{
        console.log(err);
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
    const {email, name}= req.userData;  
    comp.remove({_id: req.params.complaintId}).exec()
    .then(result=>{
        const msg= {
            to: email,
            from: process.env.EMAIL_ID,
            subject: 'Thank you',
            html: `
                <p>Dear <b>${name}</b></p>
                <p>We Hope that your problem was resolved. We look forward to serving you in the future</p>
                <p>Thanks and Regards</p>
                <p>Team CnC<p>
            `
        }
        Sgmail.send(msg, function(err, info){
            if(err){console.log("email not sent please check error: "+ err);
                    }
            else {console.log("email sent successfully");
                }
        });
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