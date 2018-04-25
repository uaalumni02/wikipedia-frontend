var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('home')
});

app.post('/', (req, res) => {
    var quest = req.body.quest;

    var requestUrl = 'http://localhost:3000/api/search?q=' + quest + '&limit=35';

    return axios.get(requestUrl)
        .then((response) => {
            var responseData = response.data;
console.log(response.data);
            return res.status(200)
                .render('result', { response: responseData });
        })
        .catch((err) => {
            res.send(err.message);
        });
});

app.listen(8080, () => {
    console.log('Server running on 8080');
})
