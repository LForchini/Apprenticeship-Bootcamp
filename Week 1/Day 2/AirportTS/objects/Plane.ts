import Passenger from "./Passenger";

/**
 * Represents a plane.
 * @constructor
 * @param {string} type The type of plane.
 */
class Plane {
  type:string
  passengers: Passenger[];

  constructor(type: string) {
    this.type = type;
    this.passengers = [];
  }

  /**
   * Adds a passenger to the flight.
   * @param {Passenger} passenger The passenger to add.
   */
  board(passenger: Passenger): void {
    this.passengers.push(passenger);
  }
}
