var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

// router.get('/',function(req,res,next){
//     res.render('index');
// })

router.post('/insertsubcategory',upload.any(),function(req, res, next){
    pool.query("insert into subcategory (categoryid,subcategoryname,description,price,stock,rented,rentamount,offers,icon,ad,adstatus) values(?,?,?,?,?,?,?,?,?,?,?)",
    [
        req.body.categoryid,
        req.body.subcategoryname,
        req.body.description,
        req.body.price,
        req.body.stock,
        req.body.rented,
        req.body.rentamount,
        req.body.offers,
        req.files[0].originalname,
        req.files[1].originalname,
        req.body.adstatus,
    ],
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

router.get('/displayall', function(req, res){
console.log(req.body)
    pool.query("select * from subcategory", 
    function(error,result){
        if(error)
        {
            console.log(error);
            res.status(500).json([]);
        }
        else{
            console.log(result)
            res.status(200).json(result);
        }
    })
});

router.post('/updateicon',upload.single('icon'),function(req,res){
    pool.query("update subcategory set icon=? where subcategoryid=?",[req.file.originalname, req.body.subcategoryid],
    function(error,result){
        if(error){
            console.log(error);
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    });
})

router.post('/updatead',upload.single('ad'),function(req,res){
    pool.query("update subcategory set ad=? where subcategoryid=?",[req.file.originalname, req.body.subcategoryid],
    function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    });
})

router.post('/updatesubcategorydata',function(req,res){
    pool.query("update subcategory set categoryid=?, subcategoryname=?, description=?,price=?,stock=?,rented=?,rentamount=?,offers=?,adstatus=? where subcategoryid=?",
    [req.body.categoryid,
    req.body.subcategoryname,
    req.body.description,
    req.body.price,
    req.body.stock,
    req.body.rented,
    req.body.rentamount,
    req.body.offers,
    req.body.adstatus,
    req.body.subcategoryid],
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

router.post('/deletedata', function(req,res,next){
    pool.query("delete from subcategory where subcategoryid=?",
    [req.body.subcategoryid],
    function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false});
        }
        else{
            res.status(200).json({result:true});
        }
    })
})

router.get("/displayoffers",function(req,res){
    pool.query("select * from subcategory where offers>0",
    [req.body.offers],
    function(error,result){
        if(error)
        {
            console.log(error);
            res.status(500).json([])
        }
        else
        {
            res.status(200).json(result)
        }
    })
})

router.post("/displaysubcategorybycategoryid",function(req,res){
    pool.query("select * from subcategory where categoryid=?",
    [req.body.categoryid],
    function(error,result){
        if(error)
        {
            res.status(500).json([]);
        }
        else{
            res.status(200).json(result);
        }
    })
})


router.post("/displayallsubcategorybycategoryid",function(req,res){
    console.log(req.body);
    pool.query("select * from subcategory where categoryid=?",
    [req.body.categoryid],
    function(error,result){
        if(error)
        {
            console.log(error);
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

router.post("/displaysubcategorydatabyid",function(req,res){
    pool.query("select * from subcategory where subcategoryid=?",[req.body.subcategoryid],
    function(error,result){
        if(error)
        {
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
})

module.exports = router;