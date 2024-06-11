const express = require('express');
const app = express();           
const morgan = require('morgan');     
require('dotenv').config();
const port = process.env.PORT;
const mongoose = require('mongoose');

app.use(express.json());
app.use(morgan("dev"));

const userRoutes = require('./src/routes/index.routes');
app.use('/api/user' , userRoutes);

async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);  
}
main()
.then(()=>console.log('Db is connected........'))
.catch(err => console.log(err));

app.listen(port,()=>{
    console.log('Server start at http://localhost:3333');
});