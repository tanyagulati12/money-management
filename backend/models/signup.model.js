const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    history: [
        {
            monthName: String,
            data: [
                {
                name: String,
                amount: Number,
                }
            ],
            monthlyIncome: Number,
            percentageOfInvestment: Number,
        },
    ],
    historySum: { type: Number, default: 0 },


}, { timestamp: true })
const User = mongoose.model('user', userSchema)
module.exports=User

//monthlyIncome, percentageOfInvestment, history: [], historySum: "0"