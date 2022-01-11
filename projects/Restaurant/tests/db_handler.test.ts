import { DAO, Restaurant } from "../src/db_handler";

describe("SQLite3", () => {
  let test_dao: DAO;

  beforeEach(async () => {
    test_dao = new DAO(":memory:");
    await test_dao.loadDatabase();
    await test_dao.createTables();
  });

  afterEach(() => {
    test_dao.close();
  });

  it("can load a database with JSON data", async () => {
    const restaurants: Restaurant[] = require("../seed.json");
    await test_dao.readJSON(restaurants);
    const result: any[] = await test_dao.all(
      "SELECT * FROM Restaurants ORDER BY Name ASC LIMIT 1;"
    );
    expect(result.length).toBe(1);
    expect(result[0].Name).toBe("Balthazar");
  });

  it("supports insertions and selctions", async () => {
    await test_dao.run(
      "INSERT INTO Restaurants (Name, Imagelink) VALUES (?, ?)",
      "Name",
      "Imagelink"
    );
    const result = await test_dao.get(
      "SELECT * FROM Restaurants WHERE Name = ?;",
      "Name"
    );
    expect(result.Name).toBe("Name");
  });
});
