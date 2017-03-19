const utils = require('./utils.js')();

const discounts = () => {
    return {
        price_break_discount: (state) => {
            let sku = state.pricing_rules.price_break[0].sku;
            let min_count = state.pricing_rules.price_break[0].min_count;
            let discount = state.pricing_rules.price_break[0].discount;

            return {
                apply_price_break: () => {
                    let count = utils.count_items_with_sku([...state.items], sku);
                    console.log(count);
                    if (count > min_count) {
                        let discounted_amount = (count * discount);
                        utils.update_amount_after_discount(state, discounted_amount);
                    }
                }
            }
        },


        free_accessory_discount: (state) => {
            let sku = state.pricing_rules.free_accessory[0].sku;
            let accessory_sku = state.pricing_rules.free_accessory[0].accessory_sku;
            let accessory_unit_price = utils.products[accessory_sku].price;
            let discounted_amount = 0;

            return {
                apply_free_accessory: () => {
                    let count = utils.count_items_with_sku([...state.items], sku);
                    let accessory_count = utils.count_items_with_sku([...state.items], accessory_sku);
                    if (accessory_count > count) {
                        discounted_amount = count * accessory_unit_price;
                    }
                    else
                        discounted_amount = accessory_count * accessory_unit_price;
                    utils.update_amount_after_discount(state, discounted_amount);
                }
            }
        },

        clearance_deals: (state) => {
            let sku = state.pricing_rules.deals[0].sku;
            let min_units = state.pricing_rules.deals[0].min_units;
            let no_discounted_units = state.pricing_rules.deals[0].no_discounted_units;
            let unit_price = utils.products[sku].price;

            return {
                apply_clearance_deals: () => {
                    let count = utils.count_items_with_sku([...state.items], sku);
                    let discounted_amount = Math.floor(count / min_units) * no_discounted_units * unit_price;
                    utils.update_amount_after_discount(state, discounted_amount);
                    console.log(state.total_amount);
                }
            }
        }
    }
};
module.exports = discounts;