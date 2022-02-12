var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');


router.post('/insertgames',upload.any(),function(req,res,next){
    pool.query("insert into addgame (categoryid,subcategoryid,gamename,description,gameprice,gamestock,rented,rentamount,offers,picture) values(?,?,?,?,?,?,?,?,?,?)",
    [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.gamename,
        req.body.description,
        req.body.gameprice,
        req.body.gamestock,
        req.body.rented,
        req.body.rentamount,
        req.body.offers,
        req.files[0].originalname
    ],function(error,result){
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


router.get('/displaygames',function(req,res,next){
    pool.query("select * from addgame",function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result)
        }
    })
})


router.post('/updatepicture',upload.single('picture'),function(req,res,next){
    pool.query("update addgame set picture=? where gameid=?",
    [req.file.originalname,
    req.body.gameid],
    function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.post('/updatedata',function(req,res,next){
    pool.query("update addgame set categoryid=?,subcategoryid=?,gamename=?,description=?,gameprice=?,gamestock=?,rented=?,rentamount=?,offers=? where gameid=?",
    [req.body.categoryid,
    req.body.subcategoryid,
    req.body.gamename,
    req.body.description,
    req.body.gameprice,
    req.body.gamestock,
    req.body.rented,
    req.body.rentamount,
    req.body.offers,
    req.body.gameid],
    function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    });
})

router.post('/deletedata',function(req,res,next){
    pool.query("delete from addgame where gameid=?",
    [req.body.gameid],
    function(error,result){
        if(error)
        {
            res.status(500).json({result:false})
        }
        else
        {
            res.status(200).json({result:true})
        }
    });
})

router.get('/gameoffers',function(req,res,next){
    console.log(req.body.error);
    pool.query("select * from addgame where offers>0",
    [req.body.offers],
    function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result)
        }
    })
})

router.post("/displayallgamesbysubcategoryid",function(req,res,next){
    pool.query("select * from addgame where subcategoryid=?",[req.body.subcategoryid],
    function(error,result)
    {
        if(error)
        {
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result);
        }
    })
})

module.exports = router;