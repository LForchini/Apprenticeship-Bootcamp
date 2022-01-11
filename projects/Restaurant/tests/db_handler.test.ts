import { DAO, Restaurant } from "../src/db_handler";

describe("SQLite3", () => {
  let test_dao: DAO;

  beforeEach(() => {
    test_dao = new DAO(":memory:");
    test_dao.createTables();
  });

  afterEach(() => {
    test_dao.close();
  });

  it("can load a database with JSON data", (done) => {
    const restaurants: Restaurant[] = require("../seed.json");
    test_dao.readJSON(restaurants);
    test_dao.all(
      "SELECT * FROM Restaurants ORDER BY Name ASC LIMIT 1;",
      (err: Error, rows: any[]) => {
        expect(rows.length).toBe(1);
        expect(rows.map((x) => x.Name)).toContain("Balthazar");
        test_dao.get(
          "SELECT COUNT(id) AS total FROM restaurants;",
          (err: Error, count: any) => {
            expect(count.total).toBe(8);
            done();
          }
        );
      }
    );
  });
});
