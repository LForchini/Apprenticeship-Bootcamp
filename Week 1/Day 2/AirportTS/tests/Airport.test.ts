const Airport = require("../src/Airport");

describe("Airport", () => {
  test("is created", () => {
    const airport = new Airport("Heathrow");
    expect(airport.name).toBe("Heathrow");
  });
});
