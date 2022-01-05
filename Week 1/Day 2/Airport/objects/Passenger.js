/**
 * Represents a passenger.
 * @constructor
 * @param {string} name - The passenger's name.
 * @param {string} passportNumber - The passenger's passport number.
 * @param {string} seatNumber - The passenger's seat number.
 */
class Passenger {
  constructor(name, passportNumber, seatNumber) {
    this.name = name;
    this.passportNumber = passportNumber;
    this.seatNumber = seatNumber;

    if (
      typeof name != "string" ||
      typeof passportNumber != "string" ||
      typeof seatNumber != "string"
    )
      throw new TypeError(
        "Name, Passport Number, and Seat Number must be strings"
      );

    this.bags = [];
  }

  /**
   * Assigns a new bag to the passenger.
   * @param {Bag} bag Bag to assign to the passenger.
   */
  addBag(bag) {
    this.bags.push(bag);
  }
}

module.exports = Passenger;
