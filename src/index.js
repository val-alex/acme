"use strict";

class Item {
  constructor(name, price, itemCode) {
    this.name = name;
    this.price = price;
    this.itemCode = itemCode;
  }
}

class Basket {
  constructor(pricingRules) {
    this.items = [];
    this.pricingRules = pricingRules;
  }

  add(item) {
    this.items.push(item);
  }

  total() {
    const totalBasket = this.pricingRules(this).reduce((a, b) => a + b, 0);
    return totalBasket;
  }

  clear() {
    return (this.items = []);
  }
}

const pricingRules = (basket) => {
  var counts = {};

  const twoForOne = (itemCode) => (item, counts) => {
    if (item.itemCode === itemCode && counts[itemCode] % 2 === 0) {
      return 0.0;
    }
  };

  const groupDiscount =
    (itemCode, groupSize, discountPrice) => (item, counts) => {
      if (item.itemCode === itemCode && counts[itemCode] === groupSize) {
        const discountForExistingItems =
          (groupSize - 1) * (item.price - discountPrice);
        return discountPrice - discountForExistingItems;
      } else if (
        item.itemCode === itemCode &&
        counts[itemCode] > discountPrice
      ) {
        return discountPrice;
      }
    };

  const defaultPrice = (item) => item.price;

  const rules = [twoForOne("FR1"), groupDiscount("SR1", 3, 4.5), defaultPrice];

  return basket.items.map((item) => {
    counts[item.itemCode] = (counts[item.itemCode] || 0) + 1;
    return rules.reduce((price, rule) => {
      return price === undefined ? rule(item, counts) : price;
    }, undefined);
  });
};

const FR1 = new Item("Fruit tea", 3.11, "FR1");
const SR1 = new Item("Strawberries", 5.0, "SR1");
const CF1 = new Item("Coffee", 11.23, "CF1");

const basket = new Basket(pricingRules);
// basket.add(FR1);
// basket.add(SR1);
const price = basket.total();
price;

// console.log(price)
// console.log(basket.items)

exports.Item = Item;
exports.Basket = Basket;
exports.FR1 = FR1;
exports.SR1 = SR1;
exports.CF1 = CF1;
exports.basket = basket;
exports.price = basket;
//------------------------------------------------
// Basket: FR1, SR1, FR1, CF1
// Total price expected: £19.34

// Basket: FR1, FR1
// Total price expected: £3.11

// Basket: SR1, SR1, FR1, SR1
// Total price expected: £16.61

// Rules
// 2 for 1 - Fruit tea
// 3 Strawberries or more, £4.50 for each Strawberry
