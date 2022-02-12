var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/insertdocumentation',upload.any(),function(req,res,next){
    console.log(req.body)
    pool.query("insert into documents (document) values (?)",
    [req.body.document],
    function(error,result){
        if(error)
        {
            console.log(error);
            res.status(500).json({result:false})
        }
        else
        {
            res.status(200).json({result:true})
        }
    })
})

router.get('/displayall',function(req,res,next){
    pool.query("select * from documents",
    function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result)
        }
    })
})

module.exports = router;