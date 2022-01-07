import Issue from "../src/Issue";
import RepairCrew from "../src/RepairCrew";
import Scooter from "../src/Scooter";

describe("Issue", () => {
  test("is created and added to the list", () => {
    const issue: Issue = new Issue("Description");
    expect(issue.description).toBe("Description");
    expect(issue.status).toBe("Open");
    expect(Issue.issues.length).toBe(1);
    expect(Issue.issues[0]).toBe(issue);
  });

  test("can be assigned to a member of the repair crew", () => {
    const issue: Issue = new Issue("Description");
    const crew: RepairCrew = new RepairCrew("Name", "Address");
    issue.assign(crew);
    expect(RepairCrew.staff[issue.assigned_index]).toBe(crew);
    expect(crew.assigned).toContain(issue);
  });

  test("can be resolved", () => {
    const issue: Issue = new Issue("Description");
    issue.resolve();
    expect(issue.status).toBe("Resolved");
  });

  test("can be resolved with a scooter", () => {
    const issue: Issue = new Issue("Description");
    const scooter: Scooter = new Scooter(1);
    issue.scooter = scooter;
    scooter.issues.push(issue);
    issue.resolve();
    expect(issue.status).toBe("Resolved");
    expect(scooter.issues.length).toBe(0);
  });
});
