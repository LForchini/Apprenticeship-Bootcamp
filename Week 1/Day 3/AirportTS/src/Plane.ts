import Airport from "./Airport";
import Bag from "./Bag";
import Traveller from "./Traveller";

/**
 * Represents a plane.
 * @constructor
 * @param {string} type The type of plane.
 * @param {Airport} airport Initial airport of the plane
 * @param {Function} goodybag Function to generate Bag to give to travellers
 */
class Plane {
  type: string;
  travellers: Traveller[] = [];
  airport: Airport;
  goodybag: Function;

  constructor(
    type: string,
    airport: Airport,
    goodybag: Function = (): Bag => {
      return new Bag(1);
    }
  ) {
    this.type = type;
    this.airport = airport;

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

  /**
   * Fly plane to a new airport
   * @param airport Airport to fly to
   */
  fly(airport: Airport) {
    this.airport = airport;
    this.travellers = [];
  }
}

export = Plane;
