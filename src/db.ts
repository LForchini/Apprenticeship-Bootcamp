const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const location =
  process.env.NODE_ENV === "test" ? "./db.test.sqlite" : "./db.sqlite";

export async function openDB() {
  return open({ filename: location, driver: sqlite3.Database });
}
