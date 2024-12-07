
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

application.post('/addTask/:account/:name/:tax', async (req, res) => {
    const { account, username, tax, name } = req.params;
    try {
        const user = await User.findOne({ username: account });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user's history
        user.history.push({ name, tax: parseInt(tax) });
        user.historySum += parseInt(tax);

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error adding task", error: err });
    }
});

// Remove Task
application.post('/removeTask/:account/:name', async (req, res) => {
    const { account, username } = req.params;
    try {
        const user = await User.findOne({ username: account });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const taskIndex = user.history.findIndex((task) => task.name === name);
        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Remove task and update historySum
        const taskValue = user.history[taskIndex].tax;
        user.history.splice(taskIndex, 1);
        user.historySum -= taskValue;

        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error removing task", error: err });
    }
});


// application.post("/createUser/:name/:monthlyIncome/:percentageOfInvestment", (req, res) => {
//     const {name, monthlyIncome, percentageOfInvestment} = req.params;
//     const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
//     for (let i = 0; i < fileContent["users"].length; i++) {
//         if (fileContent["users"][i].name === name) {
//             res.json(fileContent["users"]);
//             return;
//         }
//     }
//     fileContent["users"].push({name, monthlyIncome, percentageOfInvestment, history: [], historySum: "0"});
//     fileSystem.writeFileSync("./users.json", JSON.stringify(fileContent));
//     res.json(fileContent["users"]);
// })
// // adds task
// application.post("/addTask/:account/:name/:tax", (req, res) => {
//     const {account, name, tax} = req.params;
//     const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
//     for (let i = 0; i < fileContent["users"].length; i++) {
//         if (fileContent["users"][i].name === account) {
//             fileContent["users"][i].history.push({name, tax});
//             fileContent["users"][i].historySum = parseInt(fileContent["users"][i].historySum) + parseInt(tax);
//             fileSystem.writeFileSync("./users.json", JSON.stringify(fileContent));
//             res.json(fileContent);
//             return;
//         }
//     }

// })
// // removes history
// application.post("/removeTask/:account/:name", (req, res) => {
//     const {account, name} = req.params;
//     const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
//     for (let i = 0; i < fileContent["users"].length; i++) {
//         if(fileContent["users"][i].name === account) {
//             for(let j = 0; j< fileContent["users"][i].history.length; j++) {
//                 if(fileContent["users"][i].history[j].name === name) {
//                     const taskValue = parseInt(fileContent["users"][i].history[j].tax);
//                     delete fileContent["users"][i].history.splice(j, 1);
//                     fileContent["users"][i].historySum = parseInt(fileContent["users"][i].historySum) - taskValue;
//                     fileSystem.writeFileSync("./users.json", JSON.stringify(fileContent));
//                     res.json(fileContent);
//                     return;
//                 }
//             }
//         }
//     }
// })

// application.get("/getUsers", (req, res) => {
//     const fileContent = JSON.parse(fileSystem.readFileSync("./users.json", "utf8"));
//     res.send(fileContent);
// })


application.listen(PORT, HOST, () => {
 connnection();
    console.log(`Server listening on port ${PORT}`);
})