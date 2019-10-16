// Checks if an object is undefined, null, or empty (in terms of both array and object)
isNullOrEmpty = obj => 
    !obj || 
    (obj instanceof Object && Object.keys(obj).length === 0) ||
    (obj instanceof Array && obj.length === 0);

module.exports = {
    isNullOrEmpty
}