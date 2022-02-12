var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');
// const { query } = require('./pool');

/* GET home page. */
router.post('/addnewcategory',upload.any(), function(req, res, next) {
    pool.query("insert into categories (categoryname,description,icon,ad,adstatus) values(?,?,?,?,?)",
    [req.body.categoryname,
    req.body.description,
    req.files[0].originalname,
    req.files[1].originalname,
    req.body.adstatus],
    function(error,result){
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true});
        }
    })
});

router.get('/displayall',function(req,res){
    pool.query("select * from categories",function(error,result){
        if(error){
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.post('/updateicon',upload.single('icon'), function(req,res,next){
    pool.query("update categories set icon=? where categoryid=?",[req.file.originalname,req.body.categoryid],
    function(error, result){
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true});
        }
    })
})

router.post('/updatead',upload.single('ad'), function(req,res,next){
    pool.query("update categories set ad=? where categoryid=?",[req.file.originalname,req.body.categoryid],function(error, result){
        if(error){
            console.log(error);
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true});
        }
    })
})

router.post('/updatecategorydata', function(req,res,next){
    pool.query("update categories set categoryname=?,description=?, adstatus=? where categoryid=?",[req.body.categoryname,req.body.description,req.body.adstatus,req.body.categoryid],function(error, result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.post('/deletedata',function(req,res,next){
    pool.query("delete from categories where categoryid=?",
    [req.body.categoryid],function(error,result){
        if(error)
        {
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})


module.exports = router;
