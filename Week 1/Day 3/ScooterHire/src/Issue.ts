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

  assign(crew: RepairCrew) {
    this.assigned_index = RepairCrew.staff.indexOf(crew);
    crew.assigned.push(this);
  }

  resolve() {
    this.status = "Resolved";
  }
}

export = Issue;
