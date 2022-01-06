import RepairCrew from "./RepairCrew";
import Scooter from "./Scooter";

class Issue {
  static issues: Issue[] = [];

  description: string;
  status: string = "Open";
  assigned_index: number = -1;
  scooter: Scooter | null;

  constructor(description: string, scooter: Scooter | null = null) {
    this.description = description;
    this.scooter = scooter;
    Issue.issues.push(this);
  }

  /**
   * Assign the issue to a member of the repair crew.
   * @param crew Crew member to assign the issue to.
   */
  assign(crew: RepairCrew) {
    this.assigned_index = RepairCrew.staff.indexOf(crew);
    crew.assigned.push(this);
  }

  /**
   * Resolve the issue.
   */
  resolve() {
    this.status = "Resolved";
    if (this.scooter)
      this.scooter.issues = this.scooter.issues.filter((x) => x != this);
  }
}

export = Issue;
