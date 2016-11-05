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
    if(result && result.rows) {
        result.rows.forEach(function(item) {
            array.push(item);
        });
    }
}

function doQuery(sql, format, res) {
    pool.connect(function(err, client, done) {
        handleConnectErr(err, res, function() {
            var results = [];
            client.query(sql, function(err, result) {
                    resultToArray(result, results);
                    res.send(format(results));
            });
        });
    });
}

router.get('/sizes', function (req, res, next) {
    doQuery('select s."name", s."id", p."price" ' +
        'from pizzaown."size" s ' +
        'left join pizzaown."sizePrice" sp on sp."sizeId" = s."id" ' +
        'left join pizzaown."price" p on p."id" = sp."priceId"',
        function (results) {
            return { sizes: results };
        }, res);
});

router.get('/toppings', function (req, res, next) {
    doQuery('select t."name" as "toppingName", c."name" as "categoryName", ' +
        't."id", p."price"  ' +
        'from pizzaown."topping" t ' +
        'left join pizzaown."toppingCategory" tc on tc."toppingId" = t."id" ' +
        'left join pizzaown."category" c on c."id" = "categoryId" ' +
        'left join pizzaown."toppingPrice" tp on tp."toppingId" = t."id" ' +
        'left join pizzaown."price" p on p."id" = tp."priceId"',
        function (results) {
            return { toppings: results };

        }, res);
});

router.get('/sauces', function (req, res, next) {
    doQuery('select s."name", s."id", p."price" from pizzaown."sauce" s ' +
            'left join pizzaown."saucePrice" sp on sp."sauceId" = s."id" ' +
            'left join pizzaown."price" p on p."id" = sp."priceId"',
        function (results) {
            return { sauces: results };
        }, res);
});

router.get('/crusts', function (req, res, next) {
    doQuery('select c."name", c."id", p."price" from pizzaown."crust" c ' +
            'left join pizzaown."crustPrice" cp on cp."crustId" = c."id" ' +
            'left join pizzaown."price" p on p."id" = cp."priceId"',
        function (results) {
            return { crusts: results };
        }, res);
});

module.exports = router;