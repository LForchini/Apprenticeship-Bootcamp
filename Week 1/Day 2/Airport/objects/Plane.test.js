const Bag = require("./Bag");
const Passenger = require("./Passenger");
const Plane = require("./Plane");

describe("Plane", () => {
  test("is created", () => {
    const plane = new Plane("Type");
    expect(plane.type).toBe("Type");
  });

  test("successfully adds a Passenger", () => {
    const plane = new Plane("Type");
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    plane.board(passenger);
    expect(plane.passengers.length).toBe(1);
    expect(plane.passengers[0]).toBe(passenger);
  });

  test("successfully give the Passenger a goodybag", () => {
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
