import Customer from "../src/Customer";
import Issue from "../src/Issue";
import Scooter from "../src/Scooter";

describe("Customer", () => {
  test("is created", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    expect(customer.name).toBe("Name");
    expect(customer.address).toBe("Address");
    expect(typeof customer.payment_processor).toBe("function");
  });

  test("can reserve a scooter", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    const scooter: Scooter = new Scooter(1);
    customer.reserve(scooter);
    expect(() => {
      customer.reserve(scooter);
    }).toThrowError("Already on a trip");
    expect(customer.current_trip).not.toBe(null);
    expect(customer.current_trip?.status).toBe("Reserved");
    if (customer.current_trip)
      expect(Customer.customers[customer.current_trip.customer_index]).toBe(
        customer
      );
    expect(customer.current_trip?.scooter).toBe(scooter);
    expect(Customer.customers[scooter.reserved_by]).toBe(customer);
  });

  test("can start the trip", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    const scooter: Scooter = new Scooter(1);
    customer.reserve(scooter);
    customer.startTrip();
    expect(customer.current_trip).not.toBe(null);
    if (customer.current_trip) {
      expect(customer.current_trip.status).toBe("Underway");
    }
  });

  test("cannot start/travel/end a trip without a reserved scooter", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    expect(() => {
      customer.startTrip();
    }).toThrowError("No current trip");
    expect(() => {
      customer.travel(1);
    }).toThrowError("No current trip");
    expect(() => {
      customer.endTrip();
    }).toThrowError("No current trip");
  });

  test("can end the trip", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    const scooter: Scooter = new Scooter(1);
    customer.reserve(scooter);
    customer.startTrip();
    customer.endTrip();
    expect(customer.current_trip).toBe(null);
    expect(customer.trips.length).toBe(1);
    expect(customer.trips[0].status).toBe("Finished");
    expect(scooter.trip_history[0]).toBe(customer.trips[0]);
  });

  test("can end the trip with an issue", () => {
    const customer: Customer = new Customer("Name", "Address", () => {});
    const scooter: Scooter = new Scooter(1);
    const issue: Issue = new Issue("Broken", scooter);
    customer.reserve(scooter);
    customer.startTrip();
    customer.endTrip(issue);
    expect(customer.current_trip).toBe(null);
    expect(customer.trips.length).toBe(1);
    expect(customer.trips[0].status).toBe("Finished");
    expect(scooter.trip_history[0]).toBe(customer.trips[0]);
    expect(scooter.issues.length).toBe(1);
    expect(scooter.issues[0]).toBe(issue);
  });

  test("is charged correctly", () => {
    const pence_per_minute: number = 50;
    const travel_time: number = 24;
    const mockPayment: jest.Mock = jest.fn((x) => {});
    const customer: Customer = new Customer("Name", "Address", mockPayment);
    const scooter: Scooter = new Scooter(pence_per_minute);
    customer.reserve(scooter);
    customer.startTrip();
    customer.travel(travel_time);
    customer.endTrip();
    expect(customer.current_trip).toBe(null);
    expect(mockPayment).toHaveBeenCalled();
    expect(mockPayment).toHaveBeenCalledWith(pence_per_minute * travel_time);
    expect(customer.trips[0].price_paid).toBe(pence_per_minute * travel_time);
  });
});
