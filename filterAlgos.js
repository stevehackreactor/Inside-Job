const filters = {};

filters.websiteFilter = (string) => {
  var match = string.toLowerCase().match(/http.*com/);
  if (match) {
    return match[0];
  }
  return null;
}

filters.allWordFilter = (string, storageObj) => {
  var trimmed = string.replace(/(\.|!|\?|\/|\(|\)|:|;|=|'|"|\[|\]|<|>|_|,|\{|\}|\||@)/gm, "");
  var lowerTrim = trimmed.toLowerCase();
  // filter for words with numbers in them
  // filter with words that are longer
  //
  if (lowerTrim.length < 15) {
    if (storageObj[lowerTrim]) {
      storageObj[lowerTrim]++;
    } else {
      storageObj[lowerTrim] = 1;
    }
  }
}

filters.hrefFilter = (array) => {

}

filters.attributeFilter = (string) => {
  // filter through attributes
}

filters.valuesFilter = (string) => {
  // filter through attributes
}

module.exports = filters;
