/**
 * Created by orlandoadeyemi on 19/03/2017.
 */
"use strict";

const products = require('./config.json').products;

const sku = {sku: 'A1'};
const name = {name: 'a'};
const price = {price: 1};

const product = (_sku, _name, _price) => {
    let state = {
        sku: _sku,
        name: _name,
        price: _price
    };
    return Object.assign({}, sku, name, price, state)
};

const new_products = () => {
    return {
        new_i_pad: () => product(products.ipd.sku, products.ipd.name, products.ipd.price),

        new_mac_book: () => product(products.mbp.sku, products.mbp.name, products.mbp.price),

        new_apple_tv: () => product(products.atv.sku, products.atv.name, products.atv.price),

        new_vga_adapter: () => product(products.vga.sku, products.vga.name, products.vga.price)
    }
};
module.exports = new_products;