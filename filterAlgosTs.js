"use strict";
const filters = {};
filters.websiteFilter = (string) => {
    var match = string.toLowerCase().match(/http.*com/);
    if (match) {
        return match[0];
    }
    return null;
};
filters.allWordFilter = (string, storageObj) => {
    var trimmed = string.replace(/(\.|!|\?|\/|\(|\)|:|;|=|'|"|\[|\]|<|>|_|,|\{|\}|\||@)/gm, "");
    trimmed = trimmed.toLowerCase();
    // filter for words with numbers in them
    // filter with words that are longer
    //
    if (trimmed.length < 15) {
        if (storageObj[trimmed])
            : PossibleObjKey;
        {
            storageObj[trimmed]++;
        }
        {
            storageObj[trimmed] = 1;
        }
    }
};
filters.hrefFilter = (array) => {
    return 'nothing';
};
filters.attributeFilter = (string) => {
    // filter through attributes
    return 'nothing';
};
filters.valuesFilter = (string) => {
    // filter through attributes
    return 'nothing';
};
module.exports = filters;
