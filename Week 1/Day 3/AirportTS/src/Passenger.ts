import Traveller from "./Traveller";

/**
 * Represents a passenger.
 * @constructor
 * @param {string} name - The passenger's name.
 * @param {string} passportNumber - The passenger's passport number.
 * @param {string} seatNumber - The passenger's seat number.
 */
class Passenger extends Traveller {
  passportNumber: string;
  seatNumber: string;

  constructor(name: string, passportNumber: string, seatNumber: string) {
    super(name);

    if (
      typeof name != "string" ||
      typeof passportNumber != "string" ||
      typeof seatNumber != "string"
    )
      throw new TypeError(
        "Name, Passport Number, and Seat Number must be strings"
      );

    this.passportNumber = passportNumber;
    this.seatNumber = seatNumber;
  }
}

export = Passenger;
