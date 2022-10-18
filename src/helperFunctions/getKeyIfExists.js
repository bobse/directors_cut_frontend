export const getKeyIfExists = (obj, key) => {
  if (obj !== undefined) {
    return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : '';
  }
  return '';
};
