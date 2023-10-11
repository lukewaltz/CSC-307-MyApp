import mut from './module.js';


test('testing sum -- success', () => {
    const expected = 20;
    const got = mut.sum(15, 5);
    expect(got).toBe(expected);
})

test('Testing div -- success', () => {
    const expected = 3;
    const got = mut.div(15, 5);
    expect(got).toBe(expected);
});

test('Testing div -- typefailure', () => {
    const got = mut.div(15, "blyatt");
    expect(got).toBeNaN();
});

test('Testing div -- divby0=infinity', () => {
    const expected = Infinity
    const got = mut.div(15, 0);
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- fail | space == 0???', () => {
    const expected = true;
    const got = mut.containsNumbers("beans bears");
    expect(got).toBe(expected);
});