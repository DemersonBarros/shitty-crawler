function removeDuplicates(array, offset) {
  if (!Array.isArray(array)) {
    throw new TypeError(`${array} is not an Array`);
  } else if (!Number.isInteger(offset) || !(Math.sign(offset) >= 0)) {
    throw new TypeError(`${offset} is not a valid number`);
  }

  const pos = array[offset];
  for (let i = offset + 1; i < array.length; i += 1) {
    if (array[i] === pos) {
      array.splice(i, 1);
      i -= 1;
    }
  }

  if (array.length > offset + 1) {
    removeDuplicates(array, offset + 1);
  }
}

module.exports = removeDuplicates;
