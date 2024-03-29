export const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
}

export const findArrayElementByTag = (array, tag) => {
  return array.find((element) => {
    return element.tag === tag;
  });
}
