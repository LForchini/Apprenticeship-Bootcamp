import { DAO } from "./src/db_handler";

const d = new DAO("./restaurants.sqlite");
d.createTables();
d.readJSON(require("./seed.json"));
