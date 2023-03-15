// Obj is the object you would like to sort
// Key is the key whose value you would like to sort by
export const sortObject = (obj, key) => {
    return obj.sort((a, b) => a[key] - b[key]);
};
