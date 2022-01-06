import Customer from "./src/Customer";
import RepairCrew from "./src/RepairCrew";
import Scooter from "./src/Scooter";

import * as readline from "readline";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const customer: Customer = new Customer("Name", "Address", (x: number) => {});
const repairCrew: RepairCrew = new RepairCrew("Name", "Address");
let scooter: Scooter;

function run_command(input: string): void {
  const s: string[] = input.split(" ");

  switch (s[0]) {
    case "reserve":
      scooter = new Scooter(50);
      customer.reserve(scooter);
      break;
    case "travel":
      customer.travel(Number.parseInt(s[1]));
      break;
    case "end":
      customer.endTrip();
      break;
    case "refill":
      repairCrew.resolve(repairCrew.assigned[0]);
      break;
  }
}

rl.question("> ", (answer: string) => {
  run_command(answer);
  rl.close();
});
