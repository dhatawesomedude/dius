/**
 * Created by orlandoadeyemi on 19/03/2017.
 */

const config = require('./config.json');

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
        products : config.products,
        pricing_rules : config.pricing_rules
    }
};
module.exports = utils;