/**
 * Represents a bag, either carry-on or hold.
 * @constructor
 * @param {number} weight - The weight of the bag.
 */
class Bag {

  private weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }

  /**
   * Checks if the bag is over the weight limit which is 23kg.
   * @returns {boolean} - Whether this bag is over the weight limit.
   */
  isOverLimit(): boolean {
    return this.weight > 23;
  }
}

export = Bag;
