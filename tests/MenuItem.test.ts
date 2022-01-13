import MenuItem from "../src/models/MenuItem.model";
import { sequelize } from "../src/sequelize";

describe("MenuItem", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("can be created", async () => {
    const menuItem: MenuItem = new MenuItem({
      name: "Name",
      price: 20,
    });
    await menuItem.save();

    expect(menuItem.name).toBe("Name");
    expect(menuItem.price).toBe(20);
    expect(menuItem.id).not.toBe(null);
  });
});
