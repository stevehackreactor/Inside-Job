type NullStr = null | string;
type PossibleObjKey = undefined | number;

const filters: {
  websiteFilter?: (string: string) => NullStr,
  allWordFilter?: (string: string, storageObj: object) => void,
  hrefFilter?: (array: string[]) => string,
  attributeFilter?: (string: string) => string,
  valuesFilter?: (string: string) => string

} = {};

filters.websiteFilter = (string: string) => {
  var match = string.toLowerCase().match(/http.*com/);
  if (match) {
    return match[0];
  }
  return null;
}

filters.allWordFilter = (string: string, storageObj: object) => {
  var trimmed: string = string.replace(/(\.|!|\?|\/|\(|\)|:|;|=|'|"|\[|\]|<|>|_|,|\{|\}|\||@)/gm, "");
  trimmed = trimmed.toLowerCase();
  // filter for words with numbers in them
  // filter with words that are longer
  //
  if (trimmed.length < 15) {
    if (storageObj[trimmed]: PossibleObjKey) {
      storageObj[trimmed]++;
    } else {
      storageObj[trimmed] = 1;
    }
  }
}

filters.hrefFilter = (array: string[]) => {
  return 'nothing';
}

filters.attributeFilter = (string) => {
  // filter through attributes
  return 'nothing';
}

filters.valuesFilter = (string) => {
  // filter through attributes
  return 'nothing';
}

module.exports = filters;
