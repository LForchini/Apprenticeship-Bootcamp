import Menu from "../src/models/Menu.model";
import Restaurant from "../src/models/Restaurant.model";
import { sequelize } from "../src/sequelize";

describe("Menu", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("can be created", async () => {
    const menu: Menu = new Menu({
      title: "Title",
    });
    await menu.save();

    expect(menu.title).toBe("Title");
    expect(menu.id).not.toBe(null);
  });

  it("can be associated with a restaurant", async () => {
    const restaurant: Restaurant = new Restaurant({
      name: "Name",
      image: "Image",
    });
    await restaurant?.save();
    expect(restaurant?.id).not.toBe(null);

    const menu: Menu = new Menu({
      title: "Title",
      restaurantId: restaurant?.id,
    });

    await menu.save();

    const ret_restaurant = await Restaurant.findOne({ include: [Menu] });
    const ret_menu = await Menu.findOne({
      include: [Restaurant],
      where: { restaurantId: ret_restaurant?.id },
    });

    expect(menu.restaurantId).toBe(restaurant.id);
    expect(ret_menu?.restaurantId).toBe(ret_restaurant?.id);
    expect(ret_menu?.restaurant).not.toBe(undefined);
    expect(
      ret_menu?.restaurant.equals(ret_restaurant as Restaurant)
    ).toBeTruthy();
    expect(ret_menu?.id).not.toBe(null);
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
