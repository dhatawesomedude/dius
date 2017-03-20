/**
 * Created by orlandoadeyemi on 19/03/2017.
 */

const config = require('./config.json');
const product = require('./Product.js');

const utils = () => {
    return {
        count_items_with_sku: (items, sku)=> {
            let count = 0;
            for (let value of items) if (value['sku'] === sku) count++;

            return count;
        },
        update_amount_after_discount: (state, discounted_amount) => {
            state.total_discount += discounted_amount;
            state.total_amount -= discounted_amount;
        },
        new_products: () => {
            return {
                new_i_pad: () => product(config.products.ipd.sku, config.products.ipd.name, config.products.ipd.price),

                new_mac_book: () => product(config.products.mbp.sku, config.products.mbp.name, config.products.mbp.price),

                new_apple_tv: () => product(config.products.atv.sku, config.products.atv.name, config.products.atv.price),

                new_vga_adapter: () => product(config.products.vga.sku, config.products.vga.name, config.products.vga.price)
            }
        },
        throw_if_no : p => {
            throw new Error(`Missing parameter: ${p}`)
        },
        products: config.products,
        pricing_rules: config.pricing_rules
    }
};

module.exports = utils;