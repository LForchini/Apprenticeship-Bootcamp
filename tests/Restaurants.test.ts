import { openDB } from "../src/db";
import { Restaurant } from "../src/Restaurant";
import fs from "fs/promises";
import { Database } from "sqlite";

describe("Restaurant", () => {
  beforeAll(async () => {
    const db: Database = await openDB();
    db.exec(
      "CREATE TABLE IF NOT EXISTS Restaurants (Id INTEGER PRIMARY KEY, Name TEXT, Imagelink TEXT)"
    );
    db.close();
  });

  afterAll(async () => {
    const db: Database = await openDB();
    fs.unlink(db.config.filename);
  });

  it("is created", async () => {
    const restaurant: Restaurant = new Restaurant({
      Name: "Name",
      Imagelink: "Imagelink",
    });
    await restaurant.generateId();

    expect(restaurant.Id).toBe(1);
  });

  it("can be saved", async () => {
    const restaurant: Restaurant = new Restaurant({
      Name: "Name",
      Imagelink: "Imagelink",
    });
    await restaurant.generateId();

    await restaurant.save();

    expect(restaurant.Id).toBe(1);

    const db: Database = await openDB();
    const all: any[] = await db.all("SELECT * FROM Restaurants;");
    expect(all.length).toBe(1);
  });

  it("to be persistent", async () => {
    const db: Database = await openDB();
    const all: any[] = await db.all("SELECT * FROM Restaurants;");
    expect(all.length).toBe(1);
  });

  it("can be loaded", async () => {
    const restaurant: Restaurant = new Restaurant({
      Id: 1,
      Name: "Name",
      Imagelink: "Imagelink",
    });
    await restaurant.generateId();

    restaurant.Name = "Name2";
    await restaurant.load();

    expect(restaurant.Name).toBe("Name");
  });

  it("can be deleted", async () => {
    const restaurant: Restaurant = new Restaurant({
      Id: 1,
      Name: "Name",
      Imagelink: "Imagelink",
    });
    await restaurant.generateId();
    await restaurant.delete();

    const db: Database = await openDB();
    const all: any[] = await db.all("SELECT * FROM Restaurants;");
    expect(all.length).toBe(0);

    await restaurant.save();
  });

  it("can be updated", async () => {
    const restaurant: Restaurant = new Restaurant({
      Id: 1,
      Name: "Name",
      Imagelink: "Imagelink",
    });
    await restaurant.generateId();

    restaurant.Name = "Other Name";

    await restaurant.save();
    await restaurant.load();

    expect(restaurant.Name).toBe("Other Name");

    await restaurant.save();
  });

  it("generates an appropriate ID", async () => {
    const restaurant: Restaurant = new Restaurant({
      Id: 100,
      Name: "Name",
      Imagelink: "Imagelink",
    });
    await restaurant.generateId();
    await restaurant.save();

    expect(restaurant.Id).toBe(2);

    await restaurant.save();
  });
});
