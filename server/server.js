const express= require('express');
const morgan= require ('morgan');
const cors= require ('cors');
const mongoose=require('mongoose');
require ('dotenv').config();



const app=express();

//access to MongoDB
mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        useCreateIndex: true, 
        useFindAndModify:false 
        })
        .then(()=> console.log('MongoDB connected...'))
        .catch(err => console.log(err));

//middlewares
app.use (morgan('dev'));
app.use(cors()) ;
app.use(express.json({extended:false}));

//routes
app.use ('/api',require('./routes/post'))
app.use ('/api', require('./routes/auth'));

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
});