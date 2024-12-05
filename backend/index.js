
const express = require("express");
const router = require("./routers/signup.routes");


const fileSystem = require("node:fs");

// server config
const PORT = 8080;
const HOST = "localhost";
const cors = require("cors");
const  connnection  = require("./db/mongoose.connect");

const application = express();

// middlewares
application.use(express.json());

application.use(cors());

application.use("/auth",router)

application.get("/",(req,res)=>{
    res.send("This is home page")
})


// adds new user




application.post("/createUser/:name/:monthlyIncome/:percentageOfInvestment", (req, res) => {
    const {name, monthlyIncome, percentageOfInvestment} = req.params;
    const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
    for (let i = 0; i < fileContent["users"].length; i++) {
        if (fileContent["users"][i].name === name) {
            res.json(fileContent["users"]);
            return;
        }
    }
    fileContent["users"].push({name, monthlyIncome, percentageOfInvestment, history: [], historySum: "0"});
    fileSystem.writeFileSync("./users.json", JSON.stringify(fileContent));
    res.json(fileContent["users"]);
})
// adds task
application.post("/addTask/:account/:name/:tax", (req, res) => {
    const {account, name, tax} = req.params;
    const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
    for (let i = 0; i < fileContent["users"].length; i++) {
        if (fileContent["users"][i].name === account) {
            fileContent["users"][i].history.push({name, tax});
            fileContent["users"][i].historySum = parseInt(fileContent["users"][i].historySum) + parseInt(tax);
            fileSystem.writeFileSync("./users.json", JSON.stringify(fileContent));
            res.json(fileContent);
            return;
        }
    }

})
// removes history
application.post("/removeTask/:account/:name", (req, res) => {
    const {account, name} = req.params;
    const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
    for (let i = 0; i < fileContent["users"].length; i++) {
        if(fileContent["users"][i].name === account) {
            for(let j = 0; j< fileContent["users"][i].history.length; j++) {
                if(fileContent["users"][i].history[j].name === name) {
                    const taskValue = parseInt(fileContent["users"][i].history[j].tax);
                    delete fileContent["users"][i].history.splice(j, 1);
                    fileContent["users"][i].historySum = parseInt(fileContent["users"][i].historySum) - taskValue;
                    fileSystem.writeFileSync("./users.json", JSON.stringify(fileContent));
                    res.json(fileContent);
                    return;
                }
            }
        }
    }
})

application.get("/getUsers", (req, res) => {
    const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
    res.send(fileContent);
})


application.listen(PORT, HOST, () => {
 connnection();
    console.log(`Server listening on port ${PORT}`);
})