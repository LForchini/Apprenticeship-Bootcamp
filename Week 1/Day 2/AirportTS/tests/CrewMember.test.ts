describe("CrewMember", () => {
  const CrewMember = require("../objects/CrewMember");
  const Bag = require("../objects/Bag");

  test("is created", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    expect(crewMember.name).toBe("Name");
    expect(crewMember.position).toBe("Position");
    expect(crewMember.staffNumber).toBe("Staff Number");
  });

  test("adds Bag successfully", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    const bag = new Bag(10);
    crewMember.addBag(bag);
    expect(crewMember.bags.length).toBe(1);
    expect(crewMember.bags[0]).toBe(bag);
  });
});
