const CrewMember = require("./CrewMember");
const Bag = require("./Bag");

describe("CrewMember", () => {
  test("CrewMember to be created successfully", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    expect(crewMember.name).toBe("Name");
    expect(crewMember.position).toBe("Position");
    expect(crewMember.staffNumber).toBe("Staff Number");
  });

  test("Bag is added to CrewMember successfully", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    const bag = new Bag(10);
    crewMember.addBag(bag);
    expect(crewMember.bags.length).toBe(1);
    expect(crewMember.bags[0]).toBe(bag);
  });
});
