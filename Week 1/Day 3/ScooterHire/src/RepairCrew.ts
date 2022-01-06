import Issue from "./Issue";
import User from "./User";

class RepairCrew extends User {
  assigned: Issue[] = [];
  static staff: RepairCrew[] = [];

  constructor(name: string, address: string) {
    super(name, address);

    RepairCrew.staff.push(this);
  }

  resolve(issue: Issue) {
    issue.status = "Resolved";
    this.assigned = this.assigned.filter((x: Issue): boolean => x != issue);
    if (issue.scooter && issue.description == "Low Battery") {
      issue.scooter.charge = 100;
    }
  }

  assign(issue: Issue) {
    this.assigned.push(issue);
    if (issue.assigned_index === -1)
      issue.assigned_index = RepairCrew.staff.indexOf(this);
  }
}

export = RepairCrew;
