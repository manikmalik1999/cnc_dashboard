const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../Middleware/check-auth")
const Bolo = require("../models/bolo");
const multer = require('multer');
let conn= mongoose.connection;
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

// Grid.mongo = mongoose.mongo;
let gfs;
conn.once('open', ()=>{
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection('uploads');
})

const storage = GridFsStorage({
  // gfs : gfs,
  url: "mongodb+srv://malikmanik41:1234567890@cluster0.koktt.mongodb.net/test?retryWrites=true&w=majority",
  options: { useUnifiedTopology: true },

  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const fileFilter = (req, file, cb)=>{
if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);}
    else {cb(new Error('Only jpeg and png files allowed'), false);}
};
const upload = multer({storage: storage,
   limits:{fileSize: 1024*1024 *5},
   fileFilter: fileFilter
  });

 
router.get("/", (req, res, next) => {
  Bolo.find()
  .select('')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        bolos: docs
      };
        if (docs.length >= 0) {
      res.status(200).json(response);
        } else {
            res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/", checkAuth, upload.array('boloImage',1), (req, res, next) => {
  // console.log(req.data);
  console.log(req.files);
  const{userId}= req.userData;
  console.log("iserrorheere");
  const bo = new Bolo({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    text: req.body.text,
    image: "bolo/image/"+ req.files[0].filename,
    approved: req.body.approved
  });
  console.log("is it here?")
  bo
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Product",
        createdProduct: {
          title: result.title,
          text: result.text,
          _id: result._id,
          image: result.image,
        }
      });
    })
    .catch(err => {
      console.log("where is it?")
      console.log(err);
      res.json({
        message: err
      }).status(500);
    });
});

router.get("/image/:filename", (req, res, next )=>{
    gfs.files.findOne({filename: req.params.filename }, (err, file)=>{
      console.log(file);
      if(!file || file.length===0){
        return res.json({
          message:"No file exists"
        }).status(404);
      }
  //check if image
  if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
    //read output to browser
  const readstream = gfs.createReadStream(file.filename);
  readstream.pipe(res);
  }else{
    res.status(404).json({
      message: "Not an image"
    });
  }
  
    })
  });

  router.delete("/:boloId",checkAuth, (req, res, next) => {

    const id = req.params.boloId;
    Product.findById(id)
    .exec()
    .then(product=>{
      console.log(product);
      let filename1= product.image.substring(15);
      console.log(filename1);
      gfs.remove({filename: filename1,  root: 'uploads'}, (err)=> {
        if (err) console.log('faliure');
       else console.log('success');
      });
    }).catch(err=>{
      res.status(500).json({
        message:"Images not deleted"
      })
    });
  
    
    console.log(id);
    Bolo.deleteOne({ _id: id })
      .exec()
      .then(response=> {
        res.status(200).json({
          message: 'product deleted',
        //   request:{
        //     type: 'POST',
        //     url: 'https://limitless-lowlands-36879.herokuapp.com/products',
        //     body: {name: 'String', quantity: 'Number'}
        //   }
        }
          );
      })
      .catch(err => {
        res.status(500).json({
          error: err,
          message:" something is wrong"
        });
      });
  });

  module.exports = router;