/**
 * Represents a member of the flight crew.
 * @constructor
 * @param {string} name The name of the crew member.
 * @param {string} position The position of the crew member.
 * @param {string} staffNumber The staff number of the crew member.
 */
class CrewMember {
  constructor(name, position, staffNumber) {
    this.name = name;
    this.position = position;
    this.staffNumber = staffNumber;
    this.bags = [];
  }

  /**
   * Assigns a new bag to the crew member.
   * @param {Bag} bag The bag to assign to the crew member.
   */
  addBag(bag) {
    this.bags.push(bag);
  }
}

module.exports = CrewMember;
