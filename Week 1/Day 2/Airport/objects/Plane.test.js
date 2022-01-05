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
});
