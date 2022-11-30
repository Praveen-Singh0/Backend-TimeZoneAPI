const express = require("express");//boiler-plate-----means you know that code.
const https = require("https"); // get http request in nodejs(there is 5 ways but i use this) 

const bodyparse = require("body-parser"); // "body-parse" npm package, which is help us to retrive data from the POST request(index.html). 

const app = express();//boiler-plate

app.use(bodyparse.urlencoded({extended: true})); // this is for use of body-parse


app.get("/", function(req, res){ // get response from the server in the homepage path("/")
  res.sendFile(__dirname + "/abc.html");  // here response is a html file.
});

app.post("/", function(req,res){   

    const url = "https://worldtimeapi.org/api/timezone/Asia/kolkata"; //Endpoint of timezone API 
   
    https.get(url, function(response){ //timezone(url) se response mang rahe hein statusCode ka
    console.log(response.statusCode); // which is 200 now!

    response.on("data", function(data){ //"response.on" take few data, and here it take 'data of url' of timezone API. 
        const weather = JSON.parse(data); //jo response(data) aaya h usko readble format me dekhne ke liye JSON.parse use kr raha hein.

        // console.log(weather);     //here is your timezone API response(data) in the form of understandable. 

        const temp = weather.datetime; // here you select timezone parameter from the response(data), here i select only datetime.
        const city = req.body.cityname; //here i get input data from html file(cityname),using "request.body"

        res.write("<h1>here i am right now in "+city+" and today is "+ temp + "</h1>"); //here you send multiple response using res.write 
        res.write("<h2>my time zone is from \""+city+ "\"</h2>")
        res.send(); // and send to the client(web-page)
    })
})// res.send("server is ok!"); //Boiler-plate ,... "res.send" should be only one. ye toh yaha orr nhi h uper

});

app.listen(3000, function(){ //boiler-plate

    console.log("server chalne laga on port 3000");
});










//**server boiler-plate- jo v likhna h app.get ke beech likho */
// const express = require("express");//this is express module npm
// const app = express();

// app.get("/", function(req, res){
//     res.send("magic happens here");
    
    




// })
// app.listen(3000, function(){

//     console.log("server chalne laga on port 3000");
// });