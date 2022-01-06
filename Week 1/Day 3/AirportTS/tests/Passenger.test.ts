import Traveller from "../src/Traveller";
import Passenger from "../src/Passenger";
import Bag from "../src/Bag";

describe("Passenger", () => {
  test("is created", () => {
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    expect(passenger.name).toBe("Name");
    expect(passenger.passportNumber).toBe("Passport Number");
    expect(passenger.seatNumber).toBe("Seat Number");
    expect(passenger).toBeInstanceOf(Traveller);
  });

  test("can have bags added", () => {
    const passenger = new Passenger("Name", "Position", "Staff Number");
    const bag = new Bag(10);
    passenger.addBag(bag);
    expect(passenger.bags.length).toBe(1);
    expect(passenger.bags[0]).toBe(bag);
  });
});
