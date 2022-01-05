import Passenger from "./Passenger";
import Bag from "./Bag";

/**
 * Represents a plane.
 * @constructor
 * @param {string} type The type of plane.
 */
class Plane {
  type: string;
  passengers: Passenger[];
  goodybag: Function;

  constructor(
    type: string,
    goodybag: Function = () => {
      return new Bag(1);
    }
  ) {
    this.type = type;
    this.passengers = [];
    this.goodybag = goodybag;

    if (this.goodybag().constructor.name !== "Bag")
      throw TypeError("Goodybag must return a Bag");
  }

  /**
   * Adds a passenger to the flight.
   * @param {Passenger} passenger The passenger to add.
   */
  board(passenger: Passenger): void {
    this.passengers.push(passenger);

    passenger.addBag(this.goodybag());
  }
}

export = Plane;
