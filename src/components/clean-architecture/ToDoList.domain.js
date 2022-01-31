
export const addItemToList = (list, item) => [...list, item];

export const removeItemFromList = (list, itemIndex) => list.filter((item, index) => index !== itemIndex);

export const setItemCheckedStatus = (list, itemIndex, isChecked) => list.map((item, index) =>  index === itemIndex ? {...item, isChecked }: item);