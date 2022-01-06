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
});
