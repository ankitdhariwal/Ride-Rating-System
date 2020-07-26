const express = require("express");
const app = express();   
const router = express.Router();
const util = require('util');
const fs = require("fs");
const path = require("path");
const driveList = require("../driverList.json");

// Single driver will able to rate passenger.

router.get("/rate/:driver_id/:user_id/:rating" , function(req,res,next){

    const point = req.params.rating;
    util.log("::The Rating is :: ",point);

    if(point < 1 || point > 5){
        res.send({ error: "Your Rating is not valid", code: 307 });
        // Can be Redirect again to page rating page.
        return next();
    }

    const driverId = req.params.driver_id;
    const userId = req.params.user_id;

    if(driverId!=200){
        res.send({ error: "Your driverId is not valid", code: 404 });
        return next();
    }

    if(userId!=100){
        res.send({ error: "Your userID is not valid", code: 404 });
        return next();
    }

    res.status(200).send({"DriverID":driverId,"UserID":userId,"Rating":point});

    let data = driveList;
    data.push({"DriverID":driverId,"UserID":userId,"Rating":point});
    updateFile(data);
    next();
})

function updateFile(data){

    fs.writeFile("./driverList.json",JSON.stringify(data),function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log("File is updated");
    });

}

router.get("/:driver_id/avgrating",function(req,res,next){

    const driverId = req.params.driver_id;

    if(driverId!=200){
        res.send({ error: "Your DriverId is not valid", code: 404 });
        return next();
    }

    async function readFile(){
        var data = await fs.promises.readFile("./userList.json",'utf-8');
        return JSON.parse(data);
    }

    readFile().then(function(data){
        return data;
    }).then(function(data){
        var avgRating = findavgRating(data);
        return avgRating;
    }).then(function(avgRating){
        avgRating = avgRating.toFixed(2);
        res.status(200).send({"DriverId": driverId , "Avg Rating" : avgRating});
        next();
    }).catch(function(err){
        console.log(err);
        next();
    });

    function findavgRating(content){
        var sum=0;
        for(var val of content){
            sum = sum + parseInt(val.Rating);
        }
        avgRating = sum/content.length;
        return avgRating;
    }

})


module.exports = router;