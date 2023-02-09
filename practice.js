const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();

app.use(cors())


app.get('/', (req, res) =>{
    res.send('App is running')
});

app.listen(port, () =>{
    console.log('App listening at', port);
});