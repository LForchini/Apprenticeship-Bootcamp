import Bag from "./Bag";

/**
 * Represents a member of the flight crew.
 * @constructor
 * @param {string} name The name of the crew member.
 * @param {string} position The position of the crew member.
 * @param {string} staffNumber The staff number of the crew member.
 */
class CrewMember {
  name: string;
  position: string;
  staffNumber: string;
  bags: Bag[];

  constructor(name: string, position: string, staffNumber: string) {
    if (
      typeof name != "string" ||
      typeof position != "string" ||
      typeof staffNumber != "string"
    )
      throw new TypeError("Name, Position, and Staff Number must be strings");

    this.name = name;
    this.position = position;
    this.staffNumber = staffNumber;
    this.bags = [];
  }

  /**
   * Assigns a new bag to the crew member.
   * @param {Bag} bag The bag to assign to the crew member.
   */
  addBag(bag: Bag): void {
    this.bags.push(bag);
  }
}

export = CrewMember;
