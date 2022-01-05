const Airport = require("./Airport");

describe("Airport", () => {
  test("Successfully creates airport", () => {
    const airport = new Airport("Heathrow");
    expect(airport.name).toBe("Heathrow");
  });
});
