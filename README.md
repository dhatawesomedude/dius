# CheckoutDius - checkout system (technical challenge for Dius).


[![Coverage Status](https://coveralls.io/repos/github/dhatawesomedude/dius/badge.svg?branch=master)](https://coveralls.io/github/dhatawesomedude/dius?branch=master)



## Installation

* Install Node.js - CheckoutDius uses Node v6.4.0
* run `npm install`


## Tests
This project uses mocha test runner and istanbul for test coverage
* run `npm test`. 
* coverage reports are stored in the `coverage` directory.

## Pricing rule configuration
There are 3 pricing rules.
* Price break. Get reduced pricing for purchases above a preset quantity.
* Free accessories. Get an accessory for free when you purchase a certain item.
* Deals. Get 100% discount on a preset quantity of products when you purchase a preset quantity. Example - 3 for 2 deal : Get 100% discount on one item when you purchase 3 items.

These pricing rules can be modified in the configuration file `src/config.json`

 ### configuration examples
 * Deals.
   - 3 for 2 deal on Apple TVs. Example - if you buy 3 Apple TVs, you will pay the price of 2 only.
   - 
      ```javascript    
      deals : [{
      "sku" : "atv", //sku of apple TVs
      "min_units" : 3,
      "no_discounted_units" : 1
      }]
                     
      ```
 * Price break.    
   - Example - The price of the super ipad will drop to by 50$ each, if someone buys more than 4
   -
    
     ```javascript    
     price_break : [{
     "sku" : "ipd", //sku of the ipad
     "discount" : 50.00,
     "min_count" : 4
     }]
                  
     ```
   
 *  Free accessory. 
    - Example - free VGA adapter free of charge with every MacBook Pro sold.  
    - 
           
     ```javascript    
     free_accessory : [{
       "sku" : "mbp", //sku of the ipad.
       "accessory_sku" : "vga" //sku of the free accessory.
     }]           
     ```