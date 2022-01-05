const Bag = require("./Bag");

/**
 * Represents a plane.
 * @constructor
 * @param {string} type The type of plane.
 * @param {Function} goodybag A function which returns a goodybag to give passenger
 */
class Plane {
  constructor(type, goodybag = null) {
    this.type = type;
    this.passengers = [];

    this.goodybag = () => {
      return new Bag(1);
    };
    if (goodybag) this.goodybag = goodybag;

    if (this.goodybag().constructor.name !== "Bag")
      throw TypeError("Goodybag must return a Bag");
  }

  /**
   * Adds a passenger to the flight.
   * @param {Passenger} passenger The passenger to add.
   */
  board(passenger) {
    this.passengers.push(passenger);

    // Each passenger gets a free goody bag
    passenger.addBag(this.goodybag());
  }
}

module.exports = Plane;
