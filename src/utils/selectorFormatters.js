// NOTE: accept array with objects and return new array.
// add two new field value and label.
export const addLabelAndValue = (arrayToModify) => {
  const addNewParams = arrayToModify.map((el) => {
    if (el.fullName) {
      return {
        ...el,
        value: el.fullName,
        label: el.fullName,
      };
    } else {
      return {
        ...el,
        value: el.name,
        label: el.name,
      };
    }
  });
  return addNewParams;
};
