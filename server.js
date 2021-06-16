const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db')

dotenv.config();

//Connect to DB
connectDB();


app.use(express.json())
//import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000,()=>{
    console.log('server is runnig on port 3000');
});