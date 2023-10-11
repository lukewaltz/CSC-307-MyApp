import mut from './redgreen.js';

test('init empty portfolio', () => {
    const portfolio = new mut.Portfolio();
    expect(portfolio).toBeDefined;
})

test('check isempty', () => {
    const portfolio = new mut.Portfolio();
    const actual = portfolio.isEmpty;
    expect(actual).toBeTruthy;
})

test('test numTickers', () => {
    const portfolio = new mut.Portfolio();
    portfolio.addStock('GME', 2);
    portfolio.addStock('RBLX', 8);
    const expected = 2;
    expect(portfolio.numTickers()).toBe(expected);
})

test('test addStock new ticker', () => {
    const portfolio = new mut.Portfolio();
    portfolio.addStock('RBLX', 8);
    expect(portfolio.getStock('RBLX')).toBe(8);
})

test('test buyShares existing ticker', () => {
    const portfolio = new mut.Portfolio();
    portfolio.addStock('GME', 2);
    portfolio.addStock('RBLX', 8);
    portfolio.addStock('GME', 10)
    expect(portfolio.getStock('GME')).toBe(12);
})

test('test sellShares new ticker', () => {
    const portfolio = new mut.Portfolio();
    portfolio.addStock('GME', 16);
    portfolio.sellShares('GME', 8)
    expect(portfolio.getStock('GME')).toBe(8);
})

test('test sellShares remove ticker', () => {
    const portfolio = new mut.Portfolio();
    portfolio.addStock('GME', 16);
    portfolio.sellShares('GME', 16);
    expect(portfolio.getStock('GME')).toBe(0);
})

test('Test shareSaleException', () => {
    const portfolio = new mut.Portfolio();
    portfolio.addStock('GME', 16);
    expect(() => portfolio.sellShares('GME', 20)).toThrow(mut.ShareSaleException);
})

