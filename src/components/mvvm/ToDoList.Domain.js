
export const addItemToListLogic = (list, item) => [...list, item];

export const removeItemFromListLogic = (list, itemIndex) => list.filter((item, index) => index !== itemIndex);

export const setItemCheckedStatusLogic = (list, itemIndex, isChecked) => list.map((item, index) =>  index === itemIndex ? {...item, isChecked }: item);

export const stripOutTypeName = (list) => list.map((item) => ({id: item.id, isChecked: item.isChecked}));