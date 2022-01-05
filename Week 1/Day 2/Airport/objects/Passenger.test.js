const Passenger = require("./Passenger");
const Bag = require("./Bag");

describe("Passenger", () => {
  test("Passenger to be created successfully", () => {
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    expect(passenger.name).toBe("Name");
    expect(passenger.passportNumber).toBe("Passport Number");
    expect(passenger.seatNumber).toBe("Seat Number");
  });

  test("Bag is added to Passenger successfully", () => {
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    const bag = new Bag(10);
    passenger.addBag(bag);
    expect(passenger.bags.length).toBe(1);
    expect(passenger.bags[0]).toBe(bag);
  });
});
