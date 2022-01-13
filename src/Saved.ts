import { Database } from "sqlite";
import { openDB } from "./db";

export default abstract class Saved {
  Id: number;
  argId: number | undefined;
  table: string;

  static ids: Map<string, number> = new Map<string, number>();

  constructor(args: { Id: number | undefined; table: string }) {
    this.table = args.table;
    this.Id = -1;
    this.argId = args.Id;
  }

  async generateId() {
    if (this.argId !== undefined) {
      console.log("Requested with Id before get", this.argId);
      const db = await openDB();
      const res = await db.get(
        `SELECT * FROM ${this.table} WHERE Id = ?;`,
        this.argId
      );
      console.log("Requested with Id", res, this.argId);
      if (res !== undefined) {
        this.Id = this.argId;
      } else {
        Saved.ids.set(this.table, (Saved.ids.get(this.table) || 0) + 1);
        this.Id = Saved.ids.get(this.table) || 0;
      }
      console.log("Set this.Id to", this.Id);
    } else {
      Saved.ids.set(this.table, (Saved.ids.get(this.table) || 0) + 1);
      this.Id = Saved.ids.get(this.table) || 0;
    }
  }

  protected async saveToDB(args: any[]): Promise<void> {
    if (this.Id === -1) throw new Error("Must initialise Id with generateId()");

    // C & U
    const values = `(${"?,".repeat(args.length)}?)`;
    const db: Database = await openDB();
    const in_db = await this.inDB();

    try {
      await db.run(`BEGIN TRANSACTION;`);
      if (in_db) {
        // Update
        await db.run(`DELETE FROM ${this.table} WHERE Id = ?;`, this.Id);
      }
      // Create
      await db.run(
        `INSERT INTO ${this.table} VALUES ${values};`,
        this.Id,
        ...args
      );
      await db.run(`COMMIT TRANSACTION;`);
    } catch (err) {
      await db.run(`ROLLBACK TRANSACTION;`);
      console.error((err as Error).message);
    }
    db.close();
  }

  abstract save(): Promise<void>;

  protected async loadFromDB(): Promise<any> {
    if (this.Id === -1) throw new Error("Must initialise Id with generateId()");

    const in_db = await this.inDB();
    const db: Database = await openDB();

    if (in_db) {
      return await db.get(`SELECT * FROM ${this.table} WHERE Id = ?;`, this.Id);
    } else {
      throw new Error(`Not in database.`);
    }
  } // R

  abstract load(): Promise<void>;

  async delete(): Promise<void> {
    if (this.Id === -1) throw new Error("Must initialise Id with generateId()");

    const in_db = await this.inDB();
    const db: Database = await openDB();

    if (in_db) {
      await db.get(`DELETE FROM ${this.table} WHERE Id = ?;`, this.Id);
    } else {
      throw new Error(`Not in database.`);
    }
    db.close();
  } // D

  async inDB(): Promise<boolean> {
    if (this.Id === -1) throw new Error("Must initialise Id with generateId()");

    const db: Database = await openDB();
    const res = await db.get(
      `SELECT * FROM ${this.table} WHERE Id = ?`,
      this.Id
    );
    console.log(this.Id, res);
    db.close();
    return res !== undefined;
  }
}
