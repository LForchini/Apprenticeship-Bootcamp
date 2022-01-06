/**
 * Represents a bag, either carry-on or hold.
 * @constructor
 * @param {number} weight - The weight of the bag.
 */
class Bag {
  constructor(weight) {
    if (typeof weight != "number" || weight < 1) {
      throw new TypeError("Weight must be a number and greater than 0");
    }

    this.weight = weight;
  }

  /**
   * Checks if the bag is over the weight limit which is 23kg.
   * @returns {boolean} - Whether this bag is over the weight limit.
   */
  isOverLimit() {
    return this.weight > 23;
  }
}

module.exports = Bag;
