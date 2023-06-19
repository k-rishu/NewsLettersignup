const exrpess = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = exrpess();

app.use(exrpess.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, ()=>{console.log("listening to port 3000...")});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res)=>{
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
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
    };

    app.post("/failure", (req, res)=>{
        res.redirect("/");
    })

    const jsonData = JSON.stringify(data); 

    const url = "https://us17.api.mailchimp.com/3.0/lists/list-id";

    const options = {
        method: "POST", 
        auth: "datasu:api-key"
    }

    const request = https.request(url, options, function(response){
        // console.log(response.statusCode);
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        });
    });

    // request.write(jsonData); 
    request.end();

    // console.log("first Name "+ firstName);
    // console.log("last Name " + lastName);
    // console.log("email "+ email);
})


//API KEY


//id
//8823076c0c.
