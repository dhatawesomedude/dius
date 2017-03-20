/**
 * Created by orlandoadeyemi on 19/03/2017.
 */
const Product = require('../../src/Product.js');
const discount = require('../../src/Discounts.js')();
const expect = require('chai').expect;

describe('Discount', () => {

    it('should apply bulk discount, and drop pricing on all related items', (done) => {

        const sku = 'ipd';
        const name = 'new item';
        const unit_price = 549.99;
        const unit_discount = 50.00;
        const min_units = 2;

        const actual = Product(sku, name, unit_price);
        const items = [Object.assign({},actual), Object.assign({},actual), Object.assign({},actual)];
        const pricing_rules = {
            "price_break": [{
                "sku": sku,
                "discount": unit_discount,
                "min_count": min_units
            }]
        };

        let state = {
            items,
            total_amount: unit_price * items.length,
            total_discount: 0,
            sub_total_amount: 0,
            pricing_rules: pricing_rules
        };
        const expected_discount = unit_discount * items.length;
        const  expected_total_amount = (unit_price * items.length) - expected_discount;


        expect (discount.apply_price_break(Object.assign({},state))).to.have.property('total_amount', expected_total_amount);
        expect (discount.apply_price_break(Object.assign({},state))).to.have.property('total_discount', expected_discount);
        done();
    });

    it('should apply discount to accessories, and not charge for those accessories', (done) => {

        const sku = 'mbp';
        const name = 'macbook pro';
        const unit_price = 1399.99;

        const sku_1 = 'vga';
        const name_1 = 'VGA';
        const unit_price_1 = 30.00;

        const sku_2 = 'ipd';
        const name_2 = 'super IPAD';
        const unit_price_2 = 549.99;

        const product_1 = Product(sku, name, unit_price);
        const accessory = Product(sku_1, name_1, unit_price_1);
        const product_3 = Product(sku_2, name_2, unit_price_2);

        const items = [product_1, accessory, product_3];
        const pricing_rules = {
            "free_accessory" : [{
                "sku" : sku,
                "accessory_sku" : "vga"
            }]
        };


        let state = {
            items,
            total_amount: product_1.price + accessory.price + product_3.price,
            total_discount: 0,
            sub_total_amount: 0,
            pricing_rules: pricing_rules
        };


        const expected_total_amount = product_1.price+ product_3.price;
        const expected_total_discount = accessory.price;
        expect (discount.apply_free_accessory(Object.assign({},state))).to.have.property('total_amount', expected_total_amount);
        expect (discount.apply_free_accessory(Object.assign({},state))).to.have.property('total_discount', expected_total_discount);

        done();
    });

});