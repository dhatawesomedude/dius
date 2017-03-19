/**
 * Created by orlandoadeyemi on 19/03/2017.
 */

const discounts = require('./Discounts.js')();
const new_products = require('./Product.js')();
const pricing_rules = require('./config.json').pricing_rules;

const add_to_cart = (state, sku) => {
    if (sku === 'ipd')
        state.items = [...state.items, new_products.new_i_pad()];
    else if (sku === 'mbp')
        state.items = [...state.items, new_products.new_mac_book()];
    else if (sku === 'atv')
        state.items = [...state.items, new_products.new_apple_tv()];
    else if (sku === 'vga')
        state.items = [...state.items, new_products.new_vga_adapter()];
};

const scanner = (state) => {
    return {
        scan: (sku) => {
            add_to_cart(state, sku);
        },
        sub_total: () => {
            for (let value of state.items) {
                state.sub_total_amount += value.price;
                state.total_amount += value.price;
            }
        },
        total: (co) => {
            co.sub_total();
            co.apply_price_break();
            co.apply_free_accessory();
            co.apply_clearance_deals();
            console.log(apply_price_break);
            return state.total_amount;
        }
    }
};

const checkout = (pricing_rules) => {

    let state = {
        items: [],
        total_amount: 0,
        total_discount: 0,
        sub_total_amount: 0,
        pricing_rules: pricing_rules
    };

    return Object.assign(
        {},
        discounts.free_accessory_discount(state),
        discounts.price_break_discount(state),
        discounts.clearance_deals(state),
        scanner(state)
    )
};
module.exports = checkout;

let co = checkout(pricing_rules);
/*co.scan('atv');
 co.scan('ipd');
 co.scan('atv');
 co.scan('ipd');
 co.scan('ipd');
 co.scan('ipd');
 co.scan('ipd');*/
//co.scan('mbp');
//co.scan('vga');
//co.scan('ipd');
co.scan('atv');
/*co.scan('atv');
 co.scan('atv');
 co.scan('atv');
 co.scan('atv');
 co.scan('atv');
 co.scan('atv');*/
//co.sub_total();
//co.apply_price_break();
//co.apply_free_accessory();
//co.apply_clearance_deals();
co.total(co);
//co.apply_price_break();
//console.log(co.state);