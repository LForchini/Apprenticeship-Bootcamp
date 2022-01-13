import Issue from "../src/Issue";
import Scooter from "../src/Scooter";

describe("Scooter", () => {
  test("is created", () => {
    const scooter: Scooter = new Scooter(10);
    expect(scooter.pence_per_minute).toBe(10);
    expect(scooter.charge).toBe(100);
    expect(scooter.status).toBe("Operational");
    expect(scooter.trip_history).toStrictEqual([]);
    expect(scooter.issues).toStrictEqual([]);
  });

  test("creates an issue if low charge", () => {
    const scooter: Scooter = new Scooter(10);
    scooter.lowerCharge(110);
    expect(scooter.charge).toBe(0);
    expect(scooter.issues.length).toBe(1);
    expect(scooter.issues[0].description).toBe("Low Battery");
    expect(Issue.issues.length).toBe(1);
  });
});
