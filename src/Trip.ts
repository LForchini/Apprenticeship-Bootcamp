import Customer from "./Customer";
import Scooter from "./Scooter";

export default class Trip {
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

  /**
   * Start the trip.
   */
  start() {
    this.status = "Underway";
  }

  /**
   * End the trip.
   */
  end() {
    this.status = "Finished";
  }
}
