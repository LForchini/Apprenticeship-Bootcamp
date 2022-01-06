import Bag from "../src/Bag";
import Traveller from "../src/Traveller";

describe("Traveller", () => {
  test("is created successfully", () => {
    const traveller = new Traveller("Name");
    expect(traveller.name).toBe("Name");
  });

  test("can add bags", () => {
    const traveller = new Traveller("Name");
    const bag = new Bag(10);
    traveller.addBag(bag);
    expect(traveller.bags.length).toBe(1);
    expect(traveller.bags[0]).toBe(bag);
  });

  test("cannot add an overweight bag", () => {
    const traveller = new Traveller("Name");
    const bag = new Bag(24);
    expect(() => {
      traveller.addBag(bag);
    }).toThrowError("Bag is too heavy");
  });
});
