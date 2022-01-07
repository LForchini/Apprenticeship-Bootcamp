import Issue from "../src/Issue";
import RepairCrew from "../src/RepairCrew";
import Scooter from "../src/Scooter";

describe("Repair Crew", () => {
  test("is created", () => {
    const repairCrew: RepairCrew = new RepairCrew("Name", "Address");
    expect(RepairCrew.staff.length).toBe(1);
    expect(RepairCrew.staff[0]).toBe(repairCrew);
  });

  test("is assigned a task", () => {
    const repairCrew: RepairCrew = new RepairCrew("Name", "Address");
    const issue: Issue = new Issue("Descrition");
    repairCrew.assign(issue);
    expect(repairCrew.assigned.length).toBe(1);
    expect(repairCrew.assigned[0]).toBe(issue);
    expect(RepairCrew.staff[issue.assigned_index]).toBe(repairCrew);
  });

  test("cannot be assigned to an already assigned task", () => {
    const repairCrew: RepairCrew = new RepairCrew("Name", "Address");
    const issue: Issue = new Issue("Descrition");
    repairCrew.assign(issue);
    expect(() => {
      repairCrew.assign(issue);
    }).toThrowError("Issue already assigned");
    expect(repairCrew.assigned.length).toBe(1);
    expect(repairCrew.assigned[0]).toBe(issue);
    expect(RepairCrew.staff[issue.assigned_index]).toBe(repairCrew);
  });

  test("can resolve simple tasks", () => {
    const repairCrew: RepairCrew = new RepairCrew("Name", "Address");
    const issue: Issue = new Issue("Descrition");
    expect(() => {
      repairCrew.resolve(issue);
    }).toThrowError("Issue is not assigned to this crew member");
    repairCrew.assign(issue);
    repairCrew.resolve(issue);
    expect(issue.status).toBe("Resolved");
    expect(repairCrew.assigned.length).toBe(0);
  });

  test("can recharge scooters", () => {
    const repairCrew: RepairCrew = new RepairCrew("Name", "Address");
    const scooter: Scooter = new Scooter(1);
    scooter.lowerCharge(100);
    scooter.issues[0].assign(repairCrew);
    repairCrew.resolve(scooter.issues[0]);
    expect(scooter.charge).toBe(100);
    expect(repairCrew.assigned.length).toBe(0);
  });
});
