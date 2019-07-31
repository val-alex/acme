'use strict';

import { basket, FR1, SR1, CF1 } from './';

describe('basket should', () => {
  it('exist', () => {
    expect(basket).toBeDefined()
  })

  it('return two for one offer that is applied for FR1 item code', () => {
    basket.add(FR1);
    basket.add(FR1);
    expect(basket.total()).toBe(3.11);
    basket.clear();
  })

  it('return groupOffer that is applied to SR1', () => {
    basket.add(SR1);
    basket.add(SR1);
    basket.add(SR1);

    expect(basket.total()).toBe(13.5);
    basket.clear();
  });

  it('return £19.34 for FR1, SR1, FR1, CF1', () => {
    basket.add(FR1);
    basket.add(SR1);
    basket.add(FR1);
    basket.add(CF1);

    expect(basket.total()).toBe(19.34);
    basket.clear();
  });

  it('return £16.61 for SR1, SR1, FR1, SR1', () => {
    basket.add(SR1);
    basket.add(SR1);
    basket.add(FR1);
    basket.add(SR1);

    expect(basket.total()).toBe(16.61);
    basket.clear();
  });

  it('return correct price', () => {
    basket.add(SR1);
    basket.add(SR1);
    basket.add(SR1);
    basket.add(FR1);
    basket.add(FR1);
    basket.add(CF1);
    console.log('basket: ', basket.items.map(a => a.itemCode));
    console.log('price: ', basket.total());
    expect(basket.total()).toBe(27.84);
    basket.clear();
  });
})
