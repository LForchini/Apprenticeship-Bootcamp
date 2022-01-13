import Saved from "./Saved";

export interface RestaurantRow {
  Id?: number;
  Name: string;
  Imagelink: string;
}

export class Restaurant extends Saved implements RestaurantRow {
  Name: string;
  Imagelink: string;

  constructor(row: RestaurantRow) {
    super({ Id: row.Id, table: "Restaurants" });

    this.Name = row.Name;
    this.Imagelink = row.Imagelink;
  }

  async save(): Promise<void> {
    await super.saveToDB([this.Name, this.Imagelink]);
  }

  async load(): Promise<void> {
    const result: RestaurantRow = await super.loadFromDB();
    this.Name = result.Name;
    this.Imagelink = result.Imagelink;
  }
}
