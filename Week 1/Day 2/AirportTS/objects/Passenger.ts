import Bag from "./Bag"

/**
 * Represents a passenger.
 * @constructor
 * @param {string} name - The passenger's name.
 * @param {string} passportNumber - The passenger's passport number.
 * @param {string} seatNumber - The passenger's seat number.
 */
class Passenger {
  name: string;
  passportNumber: string
  seatNumber: string
  bags: Bag[];

  constructor(name: string, passportNumber: string, seatNumber: string) {
    this.name = name;
    this.passportNumber = passportNumber;
    this.seatNumber = seatNumber;
    this.bags = [];
  }

  /**
   * Assigns a new bag to the passenger.
   * @param {Bag} bag Bag to assign to the passenger.
   */
  addBag(bag: Bag): void {
    this.bags.push(bag);
  }
}

export = Passenger;
