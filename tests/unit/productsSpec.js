/**
 * Created by orlandoadeyemi on 19/03/2017.
 */

const Product = require('../../src/Product.js');
const expect = require('chai').expect;

describe('Product', () => {

    it('should return an object with sku, name and price', (done) => {
        const sku = 'A1';
        const name = 'new item';
        const price = 50.00;

        const actual = Product(sku, name, price);
        const expected = {
            sku, name, price
        };
        expect(actual).to.deep.equal(expected);
        done();
    });

    it ('it should throw an error when called with missing parameters', (done) => {
        expect(Product).to.throw(Error);
        done();
    })

});