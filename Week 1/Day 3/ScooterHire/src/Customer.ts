import User from "./User";
import Scooter from "./Scooter";
import Trip from "./Trip";

class Customer extends User {
  static customers: Customer[] = [];

  payment_processor: Function;
  current_trip: Trip | null;
  trips: Trip[];

  constructor(name: string, address: string, payment_processor: Function) {
    super(name, address);
    this.payment_processor = payment_processor;

    this.current_trip = null;
    Customer.customers.push(this);
    this.trips = [];
  }

  /**
   * Reserve a scooter.
   * @param scooter Scooter to reserve.
   */
  reserve(scooter: Scooter) {
    if (this.current_trip) throw new TypeError("Already on a trip");

    const index: number = Customer.customers.indexOf(this);
    this.current_trip = new Trip(index, scooter);
    scooter.reserved_by = index;
  }

  /**
   * Start a new trip with the reserved scooter.
   */
  startTrip() {
    if (!this.current_trip) throw new TypeError("No current trip");

    this.current_trip.start();
  }

  /**
   * End the current trip and call the payment processor function.
   */
  endTrip() {
    if (!this.current_trip) throw new TypeError("No current trip");

    this.trips.push(this.current_trip);
    this.current_trip.scooter.trip_history.push(this.current_trip);
    this.payment_processor(
      this.current_trip.scooter.pence_per_minute * this.current_trip.travel_time
    );
    this.current_trip.price_paid =
      this.current_trip.scooter.pence_per_minute *
      this.current_trip.travel_time;
    this.current_trip.end();

    this.current_trip = null;
  }

  /**
   * Travel for a specified number of minutes.
   * @param travel_time Amount of minutes to travel.
   */
  travel(travel_time: number) {
    if (!this.current_trip) throw new TypeError("No current trip");

    this.current_trip.travel_time += travel_time;
    this.current_trip.scooter.lowerCharge(travel_time);
  }
}

export = Customer;
