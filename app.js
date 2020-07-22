//jshint esversion:6
const express=require("express")
const bodyParser=require("body-parser")
// const request=require("request")
const https=require("https")
// const response = require("express")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
    const firstName=req.body.fName
    const lastName=req.body.lName
    const email=req.body.email
    const data= {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data)
    const url="https://us17.api.mailchimp.com/3.0/lists/1c6560dcf2"
    const options={
        method: "POST",
        auth: "marija1:9acd5903a389cd225417a49e8427bdaa-us17"

    }
    const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }else {
        res.sendFile(__dirname + "/failure.html")
    }
        response.on("data",function(data){
        })

    })
    request.write(jsonData)
    request.end()

     
})

app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(3000,function(){
    console.log("port is 3000")
})

