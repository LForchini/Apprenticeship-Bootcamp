const Bag = require("./Bag");

/**
 * Represents a plane.
 * @constructor
 * @param {string} type The type of plane.
 */
class Plane {
  constructor(
    type,
    goodybag = () => {
      new Bag(1);
    }
  ) {
    this.type = type;
    this.passengers = [];
    this.goodybag = goodybag;
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
