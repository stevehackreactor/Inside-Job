const filters = {};

filters.websiteFilter = (string) => {
  var match = string.toLowerCase().match(/http.*com/);
  if (match) {
    return match[0];
  }
  return null;
}

filters.allWordFilter = (string, storageObj) => {
  var trimmed = string.replace(/(\.|!|\?|\/|\(|\)|:|;|=|-|'|"|\[|\]|<|>|_|,\{\}\|@)/gm, "");
  var lowerTrim = trimmed.toLowerCase();
  if (storageObj[lowerTrim]) {
    storageObj[lowerTrim]++;
  } else {
    storageObj[lowerTrim] = 1;
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