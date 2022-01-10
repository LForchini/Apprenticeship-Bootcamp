import { Database, Statement } from "sqlite3";

interface MenuItem {
  name: string;
  price: number;
}

interface Menu {
  title: string;
  items: MenuItem[];
}

export interface Restaurant {
  name: string;
  image: string;
  menus: Menu[];
}

export class DAO {
  database: Database;

  constructor(database_file_path: string) {
    this.database = new Database(database_file_path, (err) => {
      if (err) console.error(err);
    });
  }

  async readJSON(restaurants: Restaurant[]) {
    restaurants.forEach((restaurant: Restaurant) => {
      let stmt: Statement = this.database.prepare(
        "INSERT INTO Restaurants (name, imagelink) VALUES (?, ?);"
      );
      stmt.run(restaurant.name, restaurant.image);
      stmt.finalize();

      const restaurant_id = this.database.get(
        "SELECT id FROM Restaurants WHERE Name = ?",
        restaurant.name
      );

      restaurant.menus.forEach((menu: Menu) => {
        let stmt: Statement = this.database.prepare(
          "INSERT INTO Menus (name, restaurantId) VALUES (?, ?);"
        );
        stmt.run(menu.title, restaurant_id);
        stmt.finalize();

        const menu_id = this.database.get(
          "SELECT id FROM Menus WHERE Name = ?",
          menu.title
        );

        menu.items.forEach((menuItem: MenuItem) => {
          let stmt: Statement = this.database.prepare(
            "INSERT INTO MenuItems (name, price, menuId) VALUES (?, ?, ?);"
          );
          stmt.run(menuItem.name, menuItem.price, menu_id);
          stmt.finalize();
        });
      });
    });
  }

  async close() {
    this.database.close();
  }

  createTables() {
    this.database.exec(
      "CREATE TABLE IF NOT EXISTS Restaurants (Id INTEGER PRIMARY KEY, Name TEXT, Imagelink TEXT);"
    );
    this.database.exec(
      "CREATE TABLE IF NOT EXISTS Menus (Id INTEGER PRIMARY KEY, Name TEXT, RestaurantId INTEGER, FOREIGN KEY (RestaurantId) REFERENCES Restaurants(Id));"
    );
    this.database.exec(
      "CREATE TABLE IF NOT EXISTS MenuItems (Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER, MenuId INTEGER, FOREIGN KEY (MenuId) REFERENCES Menus(Id));"
    );
  }
}
