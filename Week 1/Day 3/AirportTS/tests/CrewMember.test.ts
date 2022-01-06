describe("CrewMember", () => {
  const CrewMember = require("../src/CrewMember");
  const Bag = require("../src/Bag");

  test("is created", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    expect(crewMember.name).toBe("Name");
    expect(crewMember.position).toBe("Position");
    expect(crewMember.staffNumber).toBe("Staff Number");
  });

  test("can only be initialised with valid name, position and staff numbers", () => {
    expect(() => {
      const crewMember = new CrewMember(1, "Position", "Staff Number");
    }).toThrowError("Name, Position, and Staff Number must be strings");
    expect(() => {
      const crewMember = new CrewMember("Name", 1, "Staff Number");
    }).toThrowError("Name, Position, and Staff Number must be strings");
    expect(() => {
      const crewMember = new CrewMember("Name", "Position", 1);
    }).toThrowError("Name, Position, and Staff Number must be strings");
  });

  test("adds Bag successfully", () => {
    const crewMember = new CrewMember("Name", "Position", "Staff Number");
    const bag = new Bag(10);
    crewMember.addBag(bag);
    expect(crewMember.bags.length).toBe(1);
    expect(crewMember.bags[0]).toBe(bag);
  });
});
