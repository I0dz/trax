/**
 * Get a sublist of random elements according to the quantity provided.
 * @param list array from which to select elements
 * @param quantity quantity of elements to select
 * @returns array of selected elements
 */
export function samples<T>(list: Array<T>, quantity: number = 1): Array<T> {
  if (list.length === 0) {
    return [];
  }
  if (quantity > list.length) {
    throw Error(
      `
            Quantity of samples items '${quantity}' must be lower than or equal to list length.
            Errored list data:
            ${list}
            `
    );
  }
  return shuffle(list).slice(0, quantity);
}

/**
 * Shuffle an array
 * Use the Fisher-Yates algorithm, see https://bost.ocks.org/mike/shuffle/
 * and https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/18650169#18650169
 * @param array the array to shuffle
 * @returns the provided array, shuffled
 */
function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;
  let randomIndex!: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
