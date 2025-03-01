const express=require('express')
const app=express();
const db=require('./config/db')
const dotenv=require('dotenv')
dotenv.config();
const cors=require('cors');
app.use(cors())
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded());
app.use(express.json());

app.use('/', require('./routes/indexRoute'));

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${PORT}`);
})