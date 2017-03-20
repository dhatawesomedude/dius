/**
 * Created by orlandoadeyemi on 19/03/2017.
 */
/**
 * Created by orlandoadeyemi on 19/03/2017.
 */

const expect = require('chai').expect;
const checkout = require('../../src/Checkout');

describe('Checkout', () => {

    const pricing_rules = {
        "price_break" : [{
            "sku" : "ipd",
            "discount" : 50.00,
            "min_count" : 4
        }],
        "free_accessory" : [{
            "sku" : "mbp",
            "accessory_sku" : "vga"
        }],
        "deals" : [{
            "sku" : "atv",
            "min_units" : 3,
            "no_discounted_units" : 1
        }]
    };

    it('should return a checkout instance with scan and total methods', (done) => {

        const co = checkout(pricing_rules);

        expect(co).to.haveOwnProperty('scan');
        expect(co).to.haveOwnProperty('total');
        done();
    });

    it ('it should throw an error when called with missing parameters', (done) => {
        expect(checkout).to.throw(Error);
        done();
    });

    it ('it should update cart', (done) => {

        const co = checkout(pricing_rules);

        expect(co.scan('mbp')).to.have.lengthOf(1);
        expect(co.scan('ipd')).to.have.lengthOf(2);
        expect(co.scan('atv')).to.have.lengthOf(3);
        expect(co.scan('vga')).to.have.lengthOf(4);
        done();
    });

    it ('it should return total amount', (done) => {

        const co = checkout(pricing_rules);
        co.scan('mbp');
        co.scan('ipd');
        co.scan('atv');
        co.scan('vga');

        expect(co.total()).to.be.a('number');
        done();
    })
});