var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/addnewaccessory',upload.any(),function(req,res,next){
    pool.query("insert into accessories(categoryid,subcategoryid,accessoryname,description,picture,price,stock,rented,rentamount,offers) values(?,?,?,?,?,?,?,?,?,?)",
    [req.body.categoryid,
    req.body.subcategoryid,
    req.body.accessoryname,
    req.body.description,
    req.files[0].originalname,
    req.body.price,
    req.body.stock,
    req.body.rented,
    req.body.rentamount,
    req.body.offers],
    function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true});
        }
    });
})

router.get('/displayaccessories', function(req,res){
    pool.query("select * from accessories",
    function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    });
})

router.post('/updatepicture',upload.single('picture'),function(req,res,next){
    pool.query("update accessories set picture=? where accessoryid=?",
    [req.file.originalname,
    req.body.accessoryid],
    function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    });
})

router.post('/updateaccessory',function(req,res){
    pool.query("update accessories set categoryid=?,subcategoryid=?,accessoryname=?,description=?,price=?,stock=?,rented=?,rentamount=?,offers=? where accessoryid=?",
    [req.body.categoryid,
    req.body.subcategoryid,
    req.body.accessoryname,
    req.body.description,
    req.body.price,
    req.body.stock,
    req.body.rented,
    req.body.rentamount,
    req.body.offers,
    req.body.accessoryid],
    function(error,result){
        if(error)
        {
            console.log(error)
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true});
        }
    })
})

router.post("/deleteaccessories",function(req,res,next){
    pool.query("delete from accessories where accessoryid=?",[req.body.accessoryid],
    function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.get("/accessoryoffer",function(req,res,next){
    pool.query("select * from accessories where offers>0",
    [req.body.offers],
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