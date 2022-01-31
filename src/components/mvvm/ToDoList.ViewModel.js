import { useEffect, useState } from "react"
import { loadList, updateList } from './ToDoList.Model.js';
import { addItemToListLogic, removeItemFromListLogic, setItemCheckedStatusLogic, stripOutTypeName } from "./ToDoList.UseCase.js";

const newListItem = (index) => ({ id: index, isChecked: false });

export const useToDoListViewModel = () => {
    const [list, setList] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await loadList();
            setList(stripOutTypeName(data?.list));
        })();
    }, [reload])

    const addItemToList = () => setList(addItemToListLogic(list, newListItem(list.length))); 
    const removeItemFromList = (itemIndex) => setList(removeItemFromListLogic(list, itemIndex));
    const setCheckedStatus = (itemIndex, isChecked) => setList(setItemCheckedStatusLogic(list, itemIndex, isChecked));

    const triggerReload = () => setReload((prev) => !prev);
    const saveList = () => updateList(list);

    return {
        list,
        addItemToList,
        removeItemFromList,
        setCheckedStatus,
        triggerReload,
        saveList,
    };
};