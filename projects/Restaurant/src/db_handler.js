"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
// ToDo Implements Database
class DAO {
    constructor(database_file_path) {
        this.database = null;
        this.db_file_path = database_file_path;
    }
    /**
     * Load the database
     */
    loadDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield (0, sqlite_1.open)({
                filename: this.db_file_path,
                driver: sqlite3_1.default.Database,
            });
        });
    }
    /**
     * Loads an array of restaurants into the database
     * @param restaurants Restaurants array to write to the DB
     */
    readJSON(restaurants) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.database)
                return;
            for (let i = 0; i < restaurants.length; i++) {
                yield ((_a = this.database) === null || _a === void 0 ? void 0 : _a.run("INSERT INTO Restaurants (Name, Imagelink) VALUES (?, ?)", restaurants[i].name, restaurants[i].image));
                const restaurant_index = (yield ((_b = this.database) === null || _b === void 0 ? void 0 : _b.get("SELECT Id FROM Restaurants WHERE Name = ?", restaurants[i].name))).Id;
                for (let j = 0; j < restaurants[i].menus.length; j++) {
                    yield ((_c = this.database) === null || _c === void 0 ? void 0 : _c.run("INSERT INTO Menus (Name, RestaurantId) VALUES (?, ?)", restaurants[i].menus[j].title, restaurant_index));
                    const menu_index = (yield ((_d = this.database) === null || _d === void 0 ? void 0 : _d.get("SELECT Id FROM Menus WHERE Name = ? AND RestaurantId = ?", restaurants[i].menus[j].title, restaurant_index))).Id;
                    for (let k = 0; k < restaurants[i].menus[j].items.length; k++) {
                        yield ((_e = this.database) === null || _e === void 0 ? void 0 : _e.run("INSERT INTO MenuItems (Name, Price, MenuId) VALUES (?, ?, ?)", restaurants[i].menus[j].items[k].name, restaurants[i].menus[j].items[k].price, menu_index));
                    }
                }
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.database)
                this.database.close();
        });
    }
    /**
     * Creates basic Restaurant, Menu, and MenuItem tables
     */
    createTables() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.database)
                return;
            yield this.database.exec("CREATE TABLE IF NOT EXISTS Restaurants (Id INTEGER PRIMARY KEY, Name TEXT, Imagelink TEXT);");
            yield this.database.exec("CREATE TABLE IF NOT EXISTS Menus (Id INTEGER PRIMARY KEY, Name TEXT, RestaurantId INTEGER, FOREIGN KEY (RestaurantId) REFERENCES Restaurants(Id));");
            yield this.database.exec("CREATE TABLE IF NOT EXISTS MenuItems (Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER, MenuId INTEGER, FOREIGN KEY (MenuId) REFERENCES Menus(Id));");
        });
    }
    get(sql, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.database)
                return yield this.database.get(sql, ...args);
            return null;
        });
    }
    all(sql, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.database)
                return yield this.database.all(sql, ...args);
            return [];
        });
    }
    run(sql, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.database)
                yield this.database.run(sql, ...args);
        });
    }
}
exports.DAO = DAO;
