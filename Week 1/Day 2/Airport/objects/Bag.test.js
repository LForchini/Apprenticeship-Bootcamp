const Bag = require("./Bag");

describe("Bag", () => {
  test("Bag is successfully created", () => {
    const bag = new Bag(10);
    expect(bag.weight).toBe(10);
  });

  test("Bag is marked as underweight correctly", () => {
    const bag = new Bag(10);
    expect(bag.isOverLimit()).toBeFalsy();
  });

  test("Bag is marked as overweight correctly", () => {
    const bag = new Bag(24);
    expect(bag.isOverLimit()).toBeTruthy();
  });
});
