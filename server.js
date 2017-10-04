const express = require('express');
const pg = require('pg');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();

const conString = process.env.DATABASE_URL || 'postgres://localhost:5432/';

const client = new pg.Client(conString);

client.connect();
client.on('error', function(error) {
  console.error(error);
});

app.use(express.static('./public'));

loadDB();

app.get('/info', function(request,res){
  client.query(`
    SELECT * FROM info`)
    .then(data => {
      console.log('this is the get response',data);
    })
    .catch(err => console.error(err));
});

app.post('/info', (request, response) =>{
  client.query(`
  INSERT INTO info(name, age, human)
   VALUES ($1, $2, $3)`,
    [request.headers.name, request.headers.age, request.headers.human ]
  )
    .then(() => response.send('Insert complete'))
    .catch(console.error);
});

app.delete('/info', (request, response) => {
  client.query(`
  DELETE from info WHERE info_id = ${request.data.id}`)
    .then(() => console.log('delete successful', request.data))
    .catch(err => console.error(err ));
});

function loadDB(){
  client.query(`
    CREATE TABLE IF NOT EXISTS info (
      info_id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      age VARCHAR(255),
      human VARCHAR(255)

    )`)
    .catch(function(err){
      console.log(err);
    }
    );
}

app.listen(PORT, function () {
  console.log(`Your app is being served on localhost: ${PORT}`);
});
