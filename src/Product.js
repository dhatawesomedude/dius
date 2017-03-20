/**
 * Created by orlandoadeyemi on 19/03/2017.
 */
"use strict";

const products = require('./config.json').products;
const utils = require('./utils.js');
const throw_if_no = utils.throw_if_no;

const sku = {sku: 'A1'};
const name = {name: 'a'};
const price = {price: 1};

const product = (_sku = throw_if_no`sku`, _name = throw_if_no`name`, _price = throw_if_no`price`) => {
    let state = {
        sku: _sku,
        name: _name,
        price: _price
    };
    return Object.assign({}, sku, name, price, state)
};


module.exports = product;