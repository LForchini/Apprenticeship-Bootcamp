const Bag = require("../src/Bag");

describe("Bag", () => {
  test("is successfully created", () => {
    const bag = new Bag(10);
    expect(bag.weight).toBe(10);
  });

  test("can only be initialised with a valid weight", () => {
    expect(() => {
      const bag = new Bag(-1);
    }).toThrowError("Weight must be a number and greater than 0");
  });

  test("is marked as underweight correctly", () => {
    const bag = new Bag(10);
    expect(bag.isOverLimit()).toBeFalsy();
  });

  test("is marked as overweight correctly", () => {
    const bag = new Bag(24);
    expect(bag.isOverLimit()).toBeTruthy();
  });
});
