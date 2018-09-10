import _ from 'lodash'
//cookie在resonponse header格式：
// ['key1=value1','key2=value2' ,...]
//作為inputArray傳入，並且store在cookieJar的Object

export function storeFromArray(inputArray) {
    //先轉換成K-V pair
    var inputJar = getKeyValuePairsFromCookieArray(inputArray);
    _.forOwn(inputJar, (value, key) => {
        if (key.slice(0, 2) != 'dt' && key.slice(0, 3) != 'WAS') { //remove start with dt/WAS
            cookieJar[key] = value
        }
    })
}
export function getCookieString(){
    let keys = Object.keys(cookieJar);
    return keys.map(function (x) { return x + "=" + cookieJar[x]; }).join('; ');
}
export const cookieJar = {};

var getKeyValuePairsFromCookieArray = function (cookieArray) {
    var keyValuePairs = {};
    cookieArray || (cookieArray = []);
    cookieArray.forEach(function (item) {
        var firstPart = item.split(';')[0];
        var split = firstPart.split('=');
        var key = split[0].trim();
        var value = split[1].trim();
        keyValuePairs[key] = value;
    })
    return keyValuePairs;
}
