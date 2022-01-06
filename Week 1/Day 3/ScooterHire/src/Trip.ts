import Customer from "./Customer";
import Scooter from "./Scooter";

class Trip {
  status: string;
  customer_index: number = 0;
  scooter: Scooter;
  travel_time: number;
  price_paid: number;

  constructor(customer_index: number, scooter: Scooter) {
    this.status = "Reserved";
    this.customer_index = customer_index;
    this.scooter = scooter;
    this.travel_time = 0;
    this.price_paid = 0;
  }

  start() {
    this.status = "Underway";
  }

  end() {
    this.status = "Finished";
  }
}

export = Trip;
