import Bag from "./Bag";
import Traveller from "./Traveller";

/**
 * Represents a plane.
 * @constructor
 * @param {string} type The type of plane.
 */
class Plane {
  type: string;
  travellers: Traveller[];
  goodybag: Function;

  constructor(
    type: string,
    goodybag: Function = (): Bag => {
      return new Bag(1);
    }
  ) {
    this.type = type;
    this.travellers = [];
    this.goodybag = goodybag;

    if (this.goodybag().constructor.name !== "Bag")
      throw TypeError("Goodybag must return a Bag");
  }

  /**
   * Adds a traveller to the flight.
   * @param {Traveller} passenger The traveller to add.
   */
  board(traveller: Traveller): void {
    this.travellers.push(traveller);

    traveller.addBag(this.goodybag());
  }
}

export = Plane;
