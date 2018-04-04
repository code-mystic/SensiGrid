/**
 * checkURLPattren should try to detect whther the passed
 * string is an URL. Rudimentary and approximately.
 * Here is a great piece for strng checking
 * goo.gl/NSVUYb (shorneded by google)
 * @param {*} str The string to be parsed
 * @return {Boolean} True if is most likely to be an URL
 */
function checkURLPattern(str) {
    let isURL = false,
        confidence = 0,
        //minimizing the scope to required format for now
        //@to-do: ML issue to detect any valid file format.
        requiredFormats = ['js', 'json', 'csv'];
    //does the string start with http:// or https:// [Absolute Schemes]
    if (str.startsWith('http://') || str.startsWith('https://')) {
        confidence += 40; //very confident
    }
    //does the string start with ./ or ../ or / [Reative Schemes]
    else if (str.startsWith('./') || str.startsWith('../') || str.startsWith('/')) {
        confidence += 40; //very confident
    }
    //often the http part is ommitted and it starts with 'www'
    else if(str.startsWith('www')) {
        confidence += 40; //very confident
    }
    //does the string has a dot and probably ends with a file format
    if(str.indexOf('.') !== 0) {
        let arr = str.split('.'),
            probableFormat = arr[arr.length - 1];

        //having a '.' boosts minimum confidence
        confidence += 5; 

        requiredFormats.forEach(function(elem){
            if(probableFormat === elem) {
                //What if a data end with string having formats defined
                confidence += 35;
            }
        });
    }

    //if the confidence is 40 (atleast 2 conditions matched) points it is likely to 
    // be an URL
    if(confidence >= 40) {
        isURL = true;
    }

    return isURL;
}

export {checkURLPattern};