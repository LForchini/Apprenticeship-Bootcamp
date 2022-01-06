import Issue from "./Issue";
import Trip from "./Trip";

class Scooter {
  charge: number;
  miles_per_percent: number;
  pence_per_minute: number;
  status: string;
  reserved_by: number = -1;
  trip_history: Trip[] = [];
  issues: Issue[] = [];
  static issues: any;

  constructor(pence_per_minute: number) {
    this.charge = 100;
    this.miles_per_percent = 1;
    this.pence_per_minute = pence_per_minute;
    this.status = "Operational";
  }

  lowerCharge(charge: number) {
    this.charge -= charge;
    if (this.charge < 0) this.charge = 0;
    if (this.charge < 10) {
      this.issues.push(new Issue("Low Battery", this));
    }
  }
}

export = Scooter;
