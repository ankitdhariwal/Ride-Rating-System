const express = require("express");
const app = express();   
const router = express.Router();
const util = require('util');
const userPath = "../Storage";
const fs = require("fs");
const path = require("path");
const userList = require("../userList.json");

// keeping for single user with multiple ride id

router.get("/rate/:user_id/:ride_id/:rating" , function(req,res,next){

    const point = req.params.rating;
    util.log("::The Rating is :: ",point);

    if(point < 1 || point > 5){
        res.send({ error: "Your Rating is not valid", code: 307 });
        // Can be Redirect again to page rating page.
        return next();
    }

    const userId = req.params.user_id;

    if(userId!=100){
        res.send({ error: "Your userID is not valid", code: 404 });
        return next();
    }

    const rideId = req.params.ride_id;

    res.status(200).send({"UserID":userId,"RideID":rideId,"DriverID":"200","Rating": point});
    
    let data = userList;

    data.push({"UserID":userId,"RideID":rideId,"DriverID":"200","Rating" : point});
   
    updateFile(data);
    
    next();
})

function updateFile(data){

    fs.writeFile("./userList.json",JSON.stringify(data),function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log("File is updated");
    });

}

router.get("/:user_id/avgrating",function(req,res,next){

    const userId = req.params.user_id;

    if(userId!=100){
        res.send({ error: "Your userID is not valid", code: 404 });
        return next();
    }

    async function readFile(){
        var data = await fs.promises.readFile("./driverList.json",'utf-8');
        return JSON.parse(data);
    }

    readFile().then(function(data){
        return data;
    }).then(function(data){
        var avgRating = findavgRating(data);
        return avgRating;
    }).then(function(avgRating){
        avgRating = avgRating.toFixed(2);
        res.status(200).send({"UserId": userId , "Avg Rating" : avgRating});
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