var express = require('express');
var router = express.Router();

var sizeData = [
    {size: 'Small', price: 12.00},
    {size: 'Medium', price: 14.00},
    {size: 'Large', price: 16.00},
    {size: 'Extra-Large', price: 18.00}
];
var toppingData = [
    {name: 'Pepperoni', category: 'Meat', price: 1.50},
    {name: 'Sausage', category: 'Meat', price: 1.50},
    {name: 'Cheese', category: 'Cheese', price: 1.00},
    {name: 'Black Olives', category: 'Vegetable', price: 1.00},
    {name: 'Green Peppers', category: 'Vegetable', price: 1.00}
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
    res.send({toppings: toppingData});
});

router.get('/sauces', function(req, res, next) {
    res.send({sauces: sauceData});
});

router.get('/crusts', function(req, res, next) {
    res.send({crusts: crustData});
});

module.exports = router;