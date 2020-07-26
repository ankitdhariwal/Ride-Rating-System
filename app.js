const express = require("express");
const app = express();   
const util = require('util');
const port = process.env.PORT || 3000;
const passengerRating = require("./Routes/pass-rating");
const driverRating = require("./Routes/driver-rating");


app.use(express.json());

const isRideCompleted = true;  // This may be come from the front-end when your ride is completed.

app.get("/",function(req,res){
    res.send("Welcome to Ride-Rating System!!");
})

app.use("/passenger",passengerRating);
app.use("/driver",driverRating);

app.listen(port,function(){
    console.log(`Rating-System Application Listening on PORT ${port}`); 
});

