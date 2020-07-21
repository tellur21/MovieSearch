'use strict';
var path = require('path');
var express = require('express');
var axios = require('axios');
let bodyParser = require('body-parser');

var app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.disable('etag');

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// Setting up ports
app.set('port', process.env.PORT || 3000);
//const port_redis = process.env.PORT || 6379;

//configure redis client on port 6379
//const redis_client = redis.createClient(port_redis);

////Middleware Function to Check Cache
//checkCache = (req, res, next) => {
//    var val = req.query.val;

//    redis_client.get("getMovieData/" + val, (err, data) => {
//        if (err) {
//            console.log(err);
//            res.status(500).send(err);
//        }
//        //if no match found
//        if (data != null) {
//            res.send(data);
//        } else {
//            //proceed to next middleware function
//            next();
//        }
//    });
//};


//  Endpoint:  GET /getMovieData
//  @desc Return movies by title
app.get("/getMovieData", async (req, res) => {
    try
    {
        var title  = req.query.title;
        var type  = req.query.type;
        var year  = req.query.year;

        var url = `https://www.omdbapi.com/?s=${title}`;

        if (type !== undefined) {
            url = url + `&type=${type}`;
        }

        if (year !== undefined) {
            url = url + `&y=${year}`;
        }

        url = url + `&apikey=38dea4fe`;

        axios.get(url)
            .then(response => response.data)
            .then(data => {

                //add data to Redis
                //redis_client.setex("getMovieData/" + val, 300, JSON.stringify(data));

                res.json(data)
            });       

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});
