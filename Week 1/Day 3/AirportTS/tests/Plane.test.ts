import Bag from "../src/Bag";
import CrewMember from "../src/CrewMember";
import Passenger from "../src/Passenger";
import Plane from "../src/Plane";

describe("Plane", () => {
  test("is created", () => {
    const plane = new Plane("Type");
    expect(plane.type).toBe("Type");
  });

  test("successfully adds a Passenger", () => {
    const plane = new Plane("Type");
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    plane.board(passenger);
    expect(plane.travellers.length).toBe(1);
    expect(plane.travellers[0]).toBe(passenger);
  });

  test("successfully adds a Crew Member", () => {
    const plane = new Plane("Type");
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    plane.board(crewMember);
    expect(plane.travellers.length).toBe(1);
    expect(plane.travellers[0]).toBe(crewMember);
  });

  test("require a valid goodybag giving function", () => {
    expect(() => {
      const plane = new Plane("Type", () => 1);
    }).toThrowError("Goodybag must return a Bag");
  });

  test("successfully give the Passenger a goodybag", () => {
    const goodybagMock: jest.Mock = jest.fn(() => {
      return new Bag(1);
    });
    const plane = new Plane("Type", goodybagMock);
    const passenger = new Passenger("Name", "Passport Number", "Seat Number");
    plane.board(passenger);
    expect(goodybagMock).toHaveBeenCalled();
    expect(passenger.bags.length).toBe(1);
    expect(goodybagMock).toHaveReturnedWith(passenger.bags[0]);
  });
});
