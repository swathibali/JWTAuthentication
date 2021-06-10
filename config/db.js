const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(dotenv.config({path:'./.env'}));

const connectDB=async () => {
    const conn = await mongoose.connect("mongodb+srv://swathi123:12345@cluster0.zv9tv.mongodb.net/Practice?retryWrites=true&w=majority",
        {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log(`MongoDb Connected`)//${conn.connection.host}`.cyan.underline.bold)
}
module.exports = connectDB