const formattedDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${ day }-${ month }-${ year }`
};

const copyObject = (object) => JSON.parse(JSON.stringify(object));

export {
  formattedDate,
  copyObject
};