/**
 * @author ANKIT DHARIWAL
 * @email ankitdhariwal2@gmail.com
 * @date  26-07-2020
 */

- Assumptions 
    - Only for single passenger and single driver with mulpile rides.
        driver id = 200
        passenger id = 100
        ride-id can be any thing.
        Any number of ride.


- Approach to solution

    Task 1

        This should be put/update call on DB.
        But I making as get call , by bring the user_id,ride_id,rating
        in query params updating by DB.

        For now DB is not used I am using JSON to store it 
        which is userList.json .
        Every time Api is hit userList.json is updated.

         http://localhost:3000/passenger/rate/:user_id/:ride_id/:rating



    Task 2

        The passenger's rating towards driver is userList.json
        Calculating the avg rating by total sum of rating divided by total rides.

       http://localhost:3000/driver/:driver_id/avgrating

    Task 3

        The driver will rate the passenger by using passenger-id,
        In this for external information we can store the ride=id.
        But I have not store it will not make any difference to user rating.

        http://localhost:3000/driver/rate/:driver_id/:user_id/:rating

    Task 4

        As their is single driver all the rides of passenger taken with him.

        http://localhost:3000/passenger/:user_id/avgrating


    Routes folder has two files.

    1) pass-rating.js
        Which contains Task-1,4

    2) driver-rating.js
        Which contains Task-2,3


- DB SCHEMA
    Acc. to my thinking 
    Passenger table
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| user_id     | int(10)     | NO   | PRI | NULL    | auto_increment |
| ride_id     | varchar(20) | NO   |     | NULL    |                |
| cust_name   | varchar(20) | NO   |     | NULL    |                |
| date(ride)  | date        | YES  |     | NULL    |                |
| phone       | bigint(11)  | YES  |     | NULL    |                |
| city        | varchar(30) | NO   |     | NULL    |                |
| last_ride   | char(30)    | NO   |     | NULL    |                |
| pincode     | int(10)     | YES  |     | NULL    |                |
| rating      | int(10)     | YES  |     | 0       |                |
| no_of_rides | int(10)     | NO   |     | 0       |                |
+-------------+-------------+------+-----+---------+----------------+

    Driver Table

+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| driver_id   | int(10)     | NO   | PRI | NULL    | auto_increment |
| ride_id     | varchar(20) | NO   |     | NULL    |                |
| driver_name | varchar(20) | NO   |     | NULL    |                |
| date_started| date        | YES  |     | NULL    |                |
| phone       | bigint(11)  | YES  |     | NULL    |                |
| city        | varchar(30) | NO   |     | NULL    |                |
| state       | char(30)    | NO   |     | NULL    |                |
| pincode     | int(10)     | YES  |     | NULL    |                |
| rating      | int(10)     | YES  |     | 0       |                |
| no_of_rides | int(10)     | NO   |     | 0       |                |
+-------------+-------------+------+-----+---------+----------------+

ride_id(last 10 rides can be store)

- Scripts
    
    I have not used.

    EXTENSION of Work

    It can be used to get real time update of the previous rating and adding current rating can give fast avg rating.

    Can be used in storing in DB at fixed interval of time.


- HOW TO RUN

npm init to make package.json
    node app.js to run the server on port 3000 testing above mention endpoints 
    with user_id=100;
    driver_id=200;
