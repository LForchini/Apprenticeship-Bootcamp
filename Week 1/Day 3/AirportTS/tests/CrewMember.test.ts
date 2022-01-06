import Bag from "../src/Bag";
import CrewMember from "../src/CrewMember";
import Traveller from "../src/Traveller";

describe("CrewMember", () => {
  test("is created", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    expect(crewMember.name).toBe("Name");
    expect(crewMember.position).toBe("Position");
    expect(crewMember.staffNumber).toBe("Staff Number");
    expect(crewMember).toBeInstanceOf(Traveller);
  });

  test("can have bags added", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    const bag = new Bag(10);
    crewMember.addBag(bag);
    expect(crewMember.bags.length).toBe(1);
    expect(crewMember.bags[0]).toBe(bag);
  });
});
