import { DAO } from "./src/db_handler";

async function GenerateDatabase(file: string) {
  const dao = new DAO("restaurants.sqlite");
  await dao.loadDatabase();
  await dao.createTables();
  await dao.readJSON(require(file));
  await dao.close();
}

GenerateDatabase("./seed.json");
