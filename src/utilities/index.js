const changeNumber = num => Math.round((num + Number.EPSILON) * 100) / 100;

const wordsToUppercase = (name) => {
  if (!name) return;
  name = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  return name
}

export {wordsToUppercase, changeNumber };