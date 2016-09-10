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

var sizeData = [
    {size: 'Small', price: 12.00},
    {size: 'Medium', price: 14.00},
    {size: 'Large', price: 16.00},
    {size: 'Extra-Large', price: 18.00}
];
var sauceData = [
    {name: 'Red'},
    {name: 'Ranch'},
    {name: 'BBQ'},
    {name: 'Buffalo'}
];
var crustData = [
    {name: 'Hand-Tossed'},
    {name: 'Thin'},
    {name: 'Deep Dish'}
];

router.get('/sizes', function(req, res, next) {
    res.send({sizes: sizeData});
});

router.get('/toppings', function(req, res, next) {
    pool.connect(function(err, client, done) {
        if(err) {
            res.err('error fetching client from pool', err);
        }
        var results = [];
        client.query('select t."name", c."name", p."price" ' +
            'from pizzaown."topping" t ' +
            'left join pizzaown."toppingCategory" tc on tc."toppingId" = t."id" ' +
            'left join pizzaown."category" c on c."id" = "categoryId" ' +
            'left join pizzaown."toppingPrice" tp on tp."toppingId" = t."id" ' +
            'left join pizzaown."price" p on p."id" = tp."priceId"', function(err, result) {
                result.rows.forEach(function(item) {
                    results.push(item);
                });
                res.send({toppings: results});
            });
        done();
    });
});

router.get('/sauces', function(req, res, next) {
    res.send({sauces: sauceData});
});

router.get('/crusts', function(req, res, next) {
    res.send({crusts: crustData});
});

module.exports = router;