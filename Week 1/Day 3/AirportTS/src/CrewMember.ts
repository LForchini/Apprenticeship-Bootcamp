import Traveller from "./Traveller";

/**
 * Represents a member of the flight crew.
 * @constructor
 * @param {string} name The name of the crew member.
 * @param {string} position The position of the crew member.
 * @param {string} staffNumber The staff number of the crew member.
 */
class CrewMember extends Traveller {
  position: string;
  staffNumber: string;

  constructor(name: string, position: string, staffNumber: string) {
    super(name);

    this.position = position;
    this.staffNumber = staffNumber;
  }
}

export = CrewMember;
