const mongoose=require("mongoose")
const connnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.sl86y.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Database Connected")
    } catch (error) {
        console.log("Db Error occured:", error.message);
    }
}
module.exports=connnection