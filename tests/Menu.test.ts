import Menu from "../src/models/Menu.model";
import Restaurant from "../src/models/Restaurant.model";
import { sequelize } from "../src/sequelize";

describe("Menu", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("can be created and associated with a restaurant", async () => {
    const restaurant: Restaurant = new Restaurant({
      name: "Name",
      image: "Image",
    });
    await restaurant.save();
    expect(restaurant.id).not.toBe(null);

    const menu: Menu = new Menu({
      title: "Title",
      restaurantId: restaurant.id,
    });
    await menu.save();

    const getResults = await Restaurant.findByPk(menu.restaurantId);

    expect(menu.title).toBe("Title");
    expect(menu.restaurantId).toBe(restaurant.id);
    expect(getResults).not.toBe(null);
    expect(getResults?.equals(restaurant)).toBeTruthy();
    expect(menu.id).not.toBe(null);
  });

  it("can have multiple instances", async () => {
    const Menu1: Menu = new Menu({
      title: "Title",
    });
    await Menu1.save();
    const Menu2: Menu = new Menu({
      title: "Title",
    });
    await Menu2.save();

    expect(Menu1.title).toBe("Title");
    expect(Menu1.id).not.toBe(null);

    expect(Menu2.title).toBe("Title");
    expect(Menu2.id).not.toBe(Menu1.id);
  });
});
