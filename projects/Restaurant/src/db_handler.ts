import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

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
  database: Database<sqlite3.Database, sqlite3.Statement> | null = null;
  db_file_path: string;

  constructor(database_file_path: string) {
    this.db_file_path = database_file_path;
  }

  async loadDatabase() {
    this.database = await open({
      filename: this.db_file_path,
      driver: sqlite3.Database,
    });
  }

  async readJSON(restaurants: Restaurant[]) {
    if (!this.database) return;

    for (let i = 0; i < restaurants.length; i++) {
      await this.database?.run(
        "INSERT INTO Restaurants (Name, Imagelink) VALUES (?, ?)",
        restaurants[i].name,
        restaurants[i].image
      );
      const restaurant_index: number | undefined = await this.database?.get(
        "SELECT Id FROM Restaurants WHERE Name = ?",
        restaurants[i].name
      );
      for (let j = 0; j < restaurants[i].menus.length; j++) {
        await this.database?.run(
          "INSERT INTO Menus (Name, RestaurantId) VALUES (?, ?)",
          restaurants[i].menus[j].title,
          restaurant_index
        );
        const menu_index: number | undefined = await this.database?.get(
          "SELECT Id FROM Menus WHERE Name = ?",
          restaurants[i].menus[j].title
        );
        for (let k = 0; k < restaurants[i].menus[j].items.length; k++) {
          await this.database?.run(
            "INSERT INTO MenuItems (Name, Price, MenuId) VALUES (?, ?, ?)",
            restaurants[i].menus[j].items[k].name,
            restaurants[i].menus[j].items[k].price,
            menu_index
          );
        }
      }
    }
  }

  async close() {
    if (this.database) this.database.close();
  }

  async createTables() {
    if (!this.database) return;

    //await this.database.exec("DROP TABLE Restaurants;");
    await this.database.exec(
      "CREATE TABLE IF NOT EXISTS Restaurants (Id INTEGER PRIMARY KEY, Name TEXT, Imagelink TEXT);"
    );
    //await this.database.exec("DROP TABLE Menus;");
    await this.database.exec(
      "CREATE TABLE IF NOT EXISTS Menus (Id INTEGER PRIMARY KEY, Name TEXT, RestaurantId INTEGER, FOREIGN KEY (RestaurantId) REFERENCES Restaurants(Id));"
    );
    //await this.database.exec("DROP TABLE MenuItems;");
    await this.database.exec(
      "CREATE TABLE IF NOT EXISTS MenuItems (Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER, MenuId INTEGER, FOREIGN KEY (MenuId) REFERENCES Menus(Id));"
    );
  }

  async get(sql: string, ...args: any[]): Promise<any> {
    if (this.database) return await this.database.get(sql, ...args);
    return null;
  }

  async all(sql: string, ...args: any[]): Promise<any[]> {
    if (this.database) return await this.database.all(sql, ...args);
    return [];
  }

  async run(sql: string, ...args: any[]): Promise<void> {
    if (this.database) await this.database.run(sql, ...args);
  }
}
