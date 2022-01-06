import Airport from "../src/Airport";
import Bag from "../src/Bag";
import CrewMember from "../src/CrewMember";
import Passenger from "../src/Passenger";
import Plane from "../src/Plane";

describe("Plane", () => {
  test("is created", () => {
    const airport: Airport = new Airport("Heathrow");
    const plane: Plane = new Plane("Type", airport);
    expect(plane.type).toBe("Type");
  });

  test("successfully adds a Passenger", () => {
    const airport: Airport = new Airport("Heathrow");
    const plane: Plane = new Plane("Type", airport);
    const passenger: Passenger = new Passenger(
      "Name",
      "Passport Number",
      "Seat Number"
    );
    plane.board(passenger);
    expect(plane.travellers.length).toBe(1);
    expect(plane.travellers[0]).toBe(passenger);
  });

  test("successfully adds a Crew Member", () => {
    const airport: Airport = new Airport("Heathrow");
    const plane: Plane = new Plane("Type", airport);
    const crewMember: CrewMember = new CrewMember(
      "Name",
      "Position",
      "Staff Number"
    );
    plane.board(crewMember);
    expect(plane.travellers.length).toBe(1);
    expect(plane.travellers[0]).toBe(crewMember);
  });

  test("require a valid goodybag giving function", () => {
    const airport: Airport = new Airport("Heathrow");
    expect(() => {
      const plane: Plane = new Plane("Type", airport, () => 1);
    }).toThrowError("Goodybag must return a Bag");
  });

  test("can fly between airports", () => {
    const airport1: Airport = new Airport("Heathrow");
    const airport2: Airport = new Airport("Amsterdam Schipol");
    const plane: Plane = new Plane("Type", airport1);
    plane.fly(airport2);
    expect(plane.airport).toBe(airport2);
  });

  test("successfully give the Passenger a goodybag", () => {
    const goodybagMock: jest.Mock = jest.fn(() => {
      return new Bag(1);
    });
    const airport: Airport = new Airport("Heathrow");
    const plane: Plane = new Plane("Type", airport, goodybagMock);
    const passenger: Passenger = new Passenger(
      "Name",
      "Passport Number",
      "Seat Number"
    );
    plane.board(passenger);
    expect(goodybagMock).toHaveBeenCalled();
    expect(passenger.bags.length).toBe(1);
    expect(goodybagMock).toHaveReturnedWith(passenger.bags[0]);
  });
});
