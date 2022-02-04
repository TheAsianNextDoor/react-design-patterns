import {
  addItemToList,
  removeItemFromList,
  setItemCheckedStatus,
  stripOutTypeName,
} from './ToDoList.Domain.js';

export const addItemToListUseCase = (store) => {
  const { list } = store;
  const newList = addItemToList(list);

  store.setList(newList);
};

export const removeItemFromListUseCase = (store, item) => {
  const { list } = store;
  const newList = removeItemFromList(list, item);

  store.setList(newList);
};

export const setItemCheckedStatusUseCase = (store, index, item) => {
  const { list } = store;
  const newCheckedList = setItemCheckedStatus(list, index, item);

  store.setList(newCheckedList);
};

export const triggerReloadUseCase = async (store, service) => {
  const { data } = await service.loadList();

  store.setList(data.list);
};

export const stripOutTypeNameUseCase = (store) => {
  const { list } = store;

  return stripOutTypeName(list);
};
