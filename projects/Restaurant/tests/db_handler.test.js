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
Object.defineProperty(exports, "__esModule", { value: true });
const db_handler_1 = require("../src/db_handler");
describe("SQLite3", () => {
    let test_dao;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        test_dao = new db_handler_1.DAO(":memory:");
        yield test_dao.loadDatabase();
        yield test_dao.createTables();
    }));
    afterEach(() => {
        test_dao.close();
    });
    it("can load a database with JSON data", () => __awaiter(void 0, void 0, void 0, function* () {
        const restaurants = require("../seed.json");
        yield test_dao.readJSON(restaurants);
        const result1 = yield test_dao.all("SELECT * FROM Restaurants ORDER BY Name ASC LIMIT 1;");
        expect(result1.length).toBe(1);
        expect(result1[0].Name).toBe("Balthazar");
        const result2 = yield test_dao.all("SELECT * FROM Menus ORDER BY Name ASC LIMIT 1;");
        expect(result2.length).toBeGreaterThan(0);
        expect(result2[0].MenuId).not.toBe("NULL");
    }));
    it("supports insertions and selctions", () => __awaiter(void 0, void 0, void 0, function* () {
        yield test_dao.run("INSERT INTO Restaurants (Name, Imagelink) VALUES (?, ?)", "Name", "Imagelink");
        const result = yield test_dao.get("SELECT * FROM Restaurants WHERE Name = ?;", "Name");
        expect(result.Name).toBe("Name");
    }));
});
