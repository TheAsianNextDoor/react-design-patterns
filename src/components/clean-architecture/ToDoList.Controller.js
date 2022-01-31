
import { useCallback } from 'react';
import { addItemToListUseCase, removeItemFromListUseCase, setItemCheckedStatusUseCase } from './ToDoList.UseCases.js';

export const useToDoListModel = (store) => ({
    list: store.list,
    addItemToList: useCallback(
        (itemToAdd) => addItemToListUseCase(store, itemToAdd),
        [store.list],
    ),
    removeItemFromList: useCallback(
        (index) => removeItemFromListUseCase(store, index),
        [store.list],
    ),
    setCheckedStatus: useCallback(
        (index, isChecked) => setItemCheckedStatusUseCase(store, index, isChecked),
        [store.list],
    ),
});