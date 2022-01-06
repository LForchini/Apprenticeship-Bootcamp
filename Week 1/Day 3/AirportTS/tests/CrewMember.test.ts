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
});
