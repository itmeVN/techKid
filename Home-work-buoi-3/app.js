var express = require('express');

let app = express();
// var path = require('path');
// // Khi nguoi dung truy cap vao 
// app.get('/',(req,res) => {
//     console.log(__dirname);   
//     res.sendfile( __dirname + '/FE-CSS/index.html');
// });

app.get('/:name',(req,res) => {
    var name = req.params.name; 
    res.send('Hello ' + name);
});

app.use(express.static('./FE-CSS'));
app.listen(6969, (err) => {
    if (err) console.log(err);
    else console.log("Server is listening at port 6969");
});