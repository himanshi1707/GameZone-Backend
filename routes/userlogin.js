var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/chkapplogin', function(req,res,next){
    pool.query("select * from userdetails where mobileno=? and password=?",
    [
        req.body.mobileno,
        req.body.password
    ], 
    function(error,result){
        if(error)
        {
            console.log(error);
            res.status(500).json({result:false})
        }
        else{
            if(result.length==1){
                res.status(200).json({result:true,data:result[0]});
            }
            else{
                res.status(200).json({result:false})
            }
        }
    });
})

router.post('/chkuserlogin', function(req,res,next){
    pool.query("select * from userdetails where mobileno=?",
    [req.body.mobileno], 
    function(error,result){
        if(error)
        {
            console.log(error);
            res.status(500).json({result:false})
        }
        else{
            if(result.length==1){
                res.status(200).json({result:true,data:result[0]});
            }
            else{
                res.status(200).json({result:false})
            }
        }
    });
})

router.post('/adduserdetails',function(req,res,next){
    console.log(req.body)
    pool.query("insert into userdetails set emailid=?,mobileno=?,firstname=?,lastname=?,password=?,addressstatus=false,status='active'",
    [req.body.emailid,
    req.body.mobileno,
    req.body.firstname,
    req.body.lastname,
    req.body.password],
    function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true});
        }
    })
})

router.post('/updateuserdata',function(req,res,next){
    console.log(req.body)
    pool.query("update userdetails set addressone=?,addresstwo=?,state=?,city=?,zipcode=?,addressstatus=true where mobileno=?",
    [req.body.addressone,
    req.body.addresstwo,
    req.body.state,
    req.body.city,
    req.body.zipcode,
    req.body.mobileno],
    function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true});
        }
    })
})
module.exports = router;