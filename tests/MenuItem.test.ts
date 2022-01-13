import MenuItem from "../src/models/MenuItem.model";
import { sequelize } from "../src/sequelize";

describe("MenuItem", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it.todo("can be created");

  it.todo("can have multiple instances");
});
