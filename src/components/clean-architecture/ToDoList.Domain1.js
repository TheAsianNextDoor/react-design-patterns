export const addItemToList = (list) => [...list, { id: list.length, isChecked: false }];

export const removeItemFromList = (list, itemIndex) => list.filter((item, index) => index !== itemIndex);

export const setItemCheckedStatus = (list, itemIndex, isChecked) => list.map((item, index) => (index === itemIndex ? { ...item, isChecked } : item));

export const stripOutTypeName = (list) => list.map((item) => ({ id: item.id, isChecked: item.isChecked }));