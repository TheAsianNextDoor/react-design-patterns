
import { useCallback, useMemo } from 'react';
import { 
    addItemToListUseCase,
    removeItemFromListUseCase, 
    setItemCheckedStatusUseCase, 
    stripOutTypeNameUseCase, 
    triggerReloadUseCase,
} from './ToDoList.UseCases.js';

export const useToDoListModel = (store, service) => ({
    list: useMemo(
        () => stripOutTypeNameUseCase(store),
        [store.list],
    ),
    addItemToList: useCallback(
        () => addItemToListUseCase(store),
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
    triggerReload: () => triggerReloadUseCase(store, service),
    saveList: async (list) => {
        service.updateList(list)
    },
});