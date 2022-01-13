import Customer from "../src/Customer";
import Scooter from "../src/Scooter";
import Trip from "../src/Trip";

describe("Trip", () => {
  test("is created", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    const scooter: Scooter = new Scooter(1);
    const trip: Trip = new Trip(0, scooter);
    expect(trip.status).toBe("Reserved");
    expect(Customer.customers[trip.customer_index]).toBe(customer);
    expect(trip.scooter).toBe(scooter);
    expect(trip.travel_time).toBe(0);
  });

  test("can be started", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    const scooter: Scooter = new Scooter(1);
    const trip: Trip = new Trip(0, scooter);
    trip.start();
    expect(trip.status).toBe("Underway");
  });

  test("can be ended", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    const scooter: Scooter = new Scooter(1);
    const trip: Trip = new Trip(0, scooter);
    trip.start();
    trip.end();
    expect(trip.status).toBe("Finished");
  });
});
