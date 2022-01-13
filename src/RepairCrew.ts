import Issue from "./Issue";
import User from "./User";

export default class RepairCrew extends User {
  assigned: Issue[] = [];
  static staff: RepairCrew[] = [];

  constructor(name: string, address: string) {
    super(name, address);

    RepairCrew.staff.push(this);
  }

  /**
   * Resolves an issue currently assigned to this crew member.
   * @param issue Issue to resolve.
   */
  resolve(issue: Issue) {
    if (!this.assigned.includes(issue))
      throw new TypeError("Issue is not assigned to this crew member");
    issue.status = "Resolved";
    this.assigned = this.assigned.filter((x: Issue): boolean => x != issue);
    if (issue.scooter && issue.description == "Low Battery") {
      issue.scooter.charge = 100;
    }
  }

  /**
   * Assigns an issue to the crew member.
   * @param issue Issue to assign to this crew member.
   */
  assign(issue: Issue) {
    if (
      RepairCrew.staff.reduce(
        (acc: boolean, val: RepairCrew) => acc || val.assigned.includes(issue),
        false
      )
    )
      throw new Error("Issue already assigned");

    this.assigned.push(issue);
    if (issue.assigned_index === -1)
      issue.assigned_index = RepairCrew.staff.indexOf(this);
  }
}
