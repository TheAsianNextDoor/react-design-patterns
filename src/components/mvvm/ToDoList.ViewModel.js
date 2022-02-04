import { useEffect, useState } from 'react';
import { loadList, updateList } from './ToDoList.Model.js';
import {
  addItemToListLogic,
  removeItemFromListLogic,
  setItemCheckedStatusLogic,
  stripOutTypeName,
} from './ToDoList.Domain.js';

const newListItem = (index) => ({ id: index, isChecked: false });

export const useToDoListViewModel = () => {
  const [list, setList] = useState([]);
  const [serverError, setServerError] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await loadList();
      setList(stripOutTypeName(data?.list));
    })();
  }, [reload]);

  const addItemToList = () => setList(addItemToListLogic(list, newListItem(list.length)));
  const removeItemFromList = (itemIndex) => setList(removeItemFromListLogic(list, itemIndex));
  const setCheckedStatus = (itemIndex, isChecked) => setList(setItemCheckedStatusLogic(list, itemIndex, isChecked));

  const triggerReload = () => setReload((prev) => !prev);
  const saveList = async () => {
    const result = await updateList(list);

    if (result) {
      setServerError(result);
    }
  };

  return {
    list,
    serverError,
    addItemToList,
    removeItemFromList,
    setCheckedStatus,
    triggerReload,
    saveList,
  };
};
