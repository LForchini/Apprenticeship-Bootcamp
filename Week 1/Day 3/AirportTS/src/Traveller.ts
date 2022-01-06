import Bag from "./Bag";

/**
 * Represents a traveller on board a plane.
 * @constructor
 * @param {string} name The name of the traveller.
 */
class Traveller {
  name: string;
  bags: Bag[] = [];

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Assigns a new bag to the passenger.
   * @param {Bag} bag Bag to assign to the passenger.
   */
  addBag(bag: Bag): void {
    this.bags.push(bag);
  }
}

export = Traveller;
