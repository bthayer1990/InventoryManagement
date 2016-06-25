var pg = require('pg');

var config = {
  user: 'practice', //env var: PGUSER
  database: 'practice', //env var: PGDATABASE
  password: 'practice', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var client = new pg.Client(config);

function test() {
    client.connect(function(err) {
    if(err) { throw err; }
        client.query('SELECT "id", "name" FROM practice_app.stuff', function(err, result) {
            if(err) { throw err; }
            result.rows.forEach(function(entry) {
                console.log(entry);
            });
        });
    });
}

exports.test = test;