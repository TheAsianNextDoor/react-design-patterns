import { addItemToList, removeItemFromList, setItemCheckedStatus } from './ToDoList.domain.js';

export const addItemToListUseCase = (store, item) => {
    const { list } = store;
    const newList = addItemToList(list, item);

    store.updateList(newList);
};

export const removeItemFromListUseCase = (store, item) => {
    const { list } = store;
    const newList = removeItemFromList(list, item);

    store.updateList(newList);
};

export const setItemCheckedStatusUseCase = (store, index, item) => {
    const { list } = store;
    const newCheckedList = setItemCheckedStatus(list, index, item);

    store.updateList(newCheckedList);
};