const express = require('express');
const router = require('./routes/router')

const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin",  
               "http://127.0.0.1:8083"); 
    res.header("Access-Control-Allow-Headers",  
               "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
});
app.use('/api', router);

//Start the server on port 3000
app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
});