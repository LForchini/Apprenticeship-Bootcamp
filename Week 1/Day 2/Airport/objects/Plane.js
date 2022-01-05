/**
 * Represents a plane.
 * @constructor
 * @param {string} type The type of plane.
 */
class Plane {
  constructor(type) {
    this.type = type;
    this.passengers = [];
  }

  /**
   * Adds a passenger to the flight.
   * @param {Passenger} passenger The passenger to add.
   */
  board(passenger) {
    this.passengers.push(passenger);
  }
}

module.exports = Plane;
