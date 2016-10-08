var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  user: 'pizza',
  database: 'pizza',
  password: 'pizzadb',
  port: 5432, 
  max: 10,
  idleTimeoutMillis: 30000,
};

var pool = new pg.Pool(config);

function handleConnectErr(err, res, next) {
    if(err) {
        console.error(err);
        res.status(500).send('error fetching client from pool');
    }
    else {
        next();
    }
}

function resultToArray(result, array) {
    result.rows.forEach(function(item) {
        array.push(item);
    });
}

var crustData = [
    {name: 'Hand-Tossed'},
    {name: 'Thin'},
    {name: 'Deep Dish'}
];

router.get('/sizes', function(req, res, next) {
    pool.connect(function(err, client, done) {
        handleConnectErr(err, res, function() {
            var results = [];
            client.query('select "name", "id" ' +
                'from pizzaown."size"',
                function(err, result) {
                    resultToArray(result, results);
                    res.send({sizes: results});
            });
        });
    });
});

router.get('/toppings', function(req, res, next) {
    pool.connect(function(err, client, done) {
        handleConnectErr(err, res, function() {
            var results = [];
            client.query('select t."name" as "toppingName", c."name" as "categoryName", ' +
                't."id", p."price"  ' +
                'from pizzaown."topping" t ' +
                'left join pizzaown."toppingCategory" tc on tc."toppingId" = t."id" ' +
                'left join pizzaown."category" c on c."id" = "categoryId" ' +
                'left join pizzaown."toppingPrice" tp on tp."toppingId" = t."id" ' +
                'left join pizzaown."price" p on p."id" = tp."priceId"', 
                function(err, result) {
                    resultToArray(result, results);
                    res.send({toppings: results});
                });
            done();
        });
    });
});

router.get('/sauces', function(req, res, next) {
    pool.connect(function(err, client, done) {
        handleConnectErr(err, res, function() {
            var results = [];
            client.query('select "name", "id" from pizzaown."sauce"',
                function(err, result) {
                    resultToArray(result, results);
                    res.send({sauces: results});
                });
            });
        done();
    });
});

router.get('/crusts', function(req, res, next) {
    res.send({cruts: crustData});
});

module.exports = router;