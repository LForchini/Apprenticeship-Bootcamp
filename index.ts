import Menu from "./src/models/Menu.model";
import MenuItem from "./src/models/MenuItem.model";
import Restaurant from "./src/models/Restaurant.model";
import { sequelize } from "./src/sequelize";
import express, { Request, Response } from "express";

const app = express();
const PORT: number = 3000;

app.use(express.static("public"));

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

    restaurant_obj.menus.forEach(async (menu_obj: MenuObj) => {
      const menu = new Menu({
        title: menu_obj.title,
        restaurantId: restaurant.id,
        restaurant: restaurant,
      });
      await menu.save();

      menu_obj.items.forEach(async (menuItem_obj: MenuItemObj) => {
        const menuItem = new MenuItem({
          name: menuItem_obj.name,
          price: menuItem_obj.price,
          menuId: menu.id,
          menu: menu,
        });
        await menuItem.save();
      });
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server started listening at http://localhost:${PORT}`);
  loadSeed().then(() => {
    console.log(`Server loaded seed database values`);
  });
});

app.get("/now", (req: Request, res: Response) => {
  const date: Date = new Date();
  res.send(date);
});

app.get("/flipcoin", (req: Request, res: Response) => {
  res.send(Math.random() > 0.5 ? "heads" : "tails");
});

app.get("/restaurants", (req: Request, res: Response) => {
  Restaurant.findAll().then((restaurants) => {
    res.send(restaurants);
  });
});
