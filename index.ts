import Menu from "./src/models/Menu.model";
import MenuItem from "./src/models/MenuItem.model";
import Restaurant from "./src/models/Restaurant.model";
import { sequelize } from "./src/sequelize";

interface RestaurantObj {
  name: string;
  image: string;
  menus: MenuObj[];
}
interface MenuObj {
  title: string;
  items: MenuItemObj[];
}
interface MenuItemObj {
  name: string;
  price: number;
}

async function loadSeed() {
  await sequelize.sync({ force: true });
  const restaurants: RestaurantObj[] = require("./seed.json");

  restaurants.forEach(async (restaurant_obj: RestaurantObj) => {
    const restaurant = new Restaurant({
      name: restaurant_obj.name,
      image: restaurant_obj.image,
    });
    await restaurant.save();
    let menus: Menu[] = [];

    restaurant_obj.menus.forEach(async (menu_obj: MenuObj) => {
      const menu = new Menu({
        title: menu_obj.title,
        restaurantId: restaurant.id,
        restaurant: restaurant,
      });
      await menu.save();
      menus.push(menu);
      let menuItems: MenuItem[] = [];

      menu_obj.items.forEach(async (menuItem_obj: MenuItemObj) => {
        const menuItem = new MenuItem({
          name: menuItem_obj.name,
          price: menuItem_obj.price,
          menuId: menu.id,
          menu: menu,
        });
        await menuItem.save();
        menuItems.push(menuItem);
      });
      await menu.save();
    });
    await restaurant.save();
  });
}

loadSeed();
