const { initialMoney, Vendor } = require('./index')
const { changes, products } = require('./data')

describe('Vendor class', () => {
  const vending = new Vendor(products, changes, initialMoney)

  it('should return the same values', () => {
    expect(vending.products).toEqual(products)
    expect(vending.changes).toEqual(changes)
  });
  it('should Validate Money', () => {
    expect(vending.isValidMoney(50)).toEqual(true)
  });
  it('should return initail values', () => {
    expect(vending.getProfit()).toEqual(0)
  })
});
