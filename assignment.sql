
CREATE TABLE Restaurant (
  Id INTEGER PRIMARY KEY,
  Name TEXT ,
  Imagelink TEXT
);
CREATE TABLE Menu (
  Id INTEGER PRIMARY KEY,
  RestaurantId INTEGER,
  Title TEXT,
  FOREIGN KEY (RestaurantId) REFERENCES Restaurant(Id)
);
CREATE TABLE MenuItem (
  Id INTEGER PRIMARY KEY,
  MenuId INTEGER,
  Name TEXT,
  Price INTEGER,
  FOREIGN KEY (MenuId) REFERENCES Menu(Id)
);

INSERT INTO Restaurant (Name, Imagelink) VALUES ("TEST1", "TEST1");
INSERT INTO Restaurant (Name, Imagelink) VALUES ("TEST2", "TEST2");
INSERT INTO Restaurant (Name, Imagelink) VALUES ("TEST3", "TEST3");
/*SELECT Imagelink, COUNT(Imagelink) FROM Restaurant GROUP BY Imagelink;
SELECT "";
UPDATE Restaurant SET Imagelink = "TEST1" WHERE Imagelink = "TEST3";
SELECT Imagelink, COUNT(Imagelink) FROM Restaurant GROUP BY Imagelink;
SELECT "";
DELETE FROM Restaurant WHERE Name = "TEST3";
SELECT Imagelink, COUNT(Imagelink) FROM Restaurant GROUP BY Imagelink;
SELECT ""; */

INSERT INTO Menu (Title, RestaurantId) VALUES ("Menu 1", 1);
INSERT INTO Menu (Title, RestaurantId) VALUES ("Menu 2", 2);
INSERT INTO Menu (Title, RestaurantId) VALUES ("Menu 3", 3);

INSERT INTO MenuItem (MenuId, Name, Price) VALUES (1, "Menu Item 1", 300);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (2, "Menu Item 2", 250);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (3, "Menu Item 3", 200);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (1, "Menu Item 4", 200);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (2, "Menu Item 5", 200);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (3, "Menu Item 6", 200);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (1, "Menu Item 7", 200);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (2, "Menu Item 8", 200);
INSERT INTO MenuItem (MenuId, Name, Price) VALUES (3, "Menu Item 9", 200);

-- SELECT ALL MENU ITEMS FROM SPECIFIC RESTAURANT

SELECT /*Restaurant.Name, Menu.Title,*/ MenuItem.Name, MenuItem.Price
FROM Menu 
INNER JOIN MenuItem ON Menu.id=MenuItem.MenuId 
INNER JOIN Restaurant ON Menu.RestaurantId=Restaurant.Id
WHERE Restaurant.Name = "TEST2"
ORDER BY Menu.Title ASC;

SELECT "";

-- COUNT OF HOW MANY MENUS PER RESTAURANT

SELECT Restaurant.Name, COUNT(Menu.Id) 
FROM Restaurant
INNER JOIN Menu ON Restaurant.id=Menu.RestaurantId
GROUP BY Restaurant.Name;

SELECT "";

-- TOTAL PRICE OF MENU PER RESTAURANT

SELECT Menu.Title, SUM(MenuItem.Price)
FROM Menu
INNER JOIN MenuItem on MenuItem.MenuId=Menu.Id
GROUP BY Menu.Title
ORDER BY SUM(MenuItem.Price) DESC;