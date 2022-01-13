describe("Passenger", () => {
  const Passenger = require("../src/Passenger");
  const Bag = require("../src/Bag");

  test("is created", () => {
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    expect(passenger.name).toBe("Name");
    expect(passenger.passportNumber).toBe("Passport Number");
    expect(passenger.seatNumber).toBe("Seat Number");
  });

  test("can only be initialised with valid name, passport number and seat numbers", () => {
    expect(() => {
      const passenger = new Passenger(1, "Passport Number", "Staff Number");
    }).toThrowError("Name, Passport Number, and Seat Number must be strings");
    expect(() => {
      const passenger = new Passenger("Name", 1, "Seat Number");
    }).toThrowError("Name, Passport Number, and Seat Number must be strings");
    expect(() => {
      const passenger = new Passenger("Name", "Passport Number", 1);
    }).toThrowError("Name, Passport Number, and Seat Number must be strings");
  });

  test("adds Bag", () => {
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    const bag = new Bag(10);
    passenger.addBag(bag);
    expect(passenger.bags.length).toBe(1);
    expect(passenger.bags[0]).toBe(bag);
  });
});
