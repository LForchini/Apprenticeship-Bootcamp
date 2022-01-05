const Bag = require("./Bag");
const Passenger = require("./Passenger");
const Plane = require("./Plane");

describe("Plane", () => {
  test("Successful plane creation", () => {
    const plane = new Plane("Type");
    expect(plane.type).toBe("Type");
  });

  test("Successfully add a passenger to the plane", () => {
    const plane = new Plane("Type");
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    plane.board(passenger);
    expect(plane.passengers.length).toBe(1);
    expect(plane.passengers[0]).toBe(passenger);
  });

  test("Successfully give the passenger a goodybag", () => {
    const goodybagMock = jest.fn(() => {
      new Bag(1);
    });
    const plane = new Plane("Type", goodybagMock);
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    plane.board(passenger);
    expect(goodybagMock.mock.calls.length).toBe(1);
    expect(passenger.bags.length).toBe(1);
    expect(passenger.bags[0]).toBe(goodybagMock.mock.calls[0].value);
  });
});
