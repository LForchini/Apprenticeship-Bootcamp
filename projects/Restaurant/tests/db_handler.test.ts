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

  it("can load a database with JSON data", async () => {
    const restaurants: Restaurant[] = require("../seed.json");
    await test_dao.readJSON(restaurants);
  });
});
