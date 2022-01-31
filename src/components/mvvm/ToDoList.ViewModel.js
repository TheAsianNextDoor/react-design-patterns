import { useCallback, useEffect, useState } from "react"
import { loadList, updateList } from './ToDoList.Model.js';
import { addItemToListLogic, removeItemFromListLogic, setItemCheckedStatusLogic, stripOutTypeName } from "./ToDoList.UseCase.js";
import { gql, useMutation, useQuery } from '@apollo/client';

const newListItem = (index) => ({ id: index, isChecked: false });

const listQuery = gql`
    query getList {
        list {
            id
            isChecked
        }
    }
`;

const listMutation = gql`
    mutation UpdateList($newList: [inputUpdateList]) {
        updateList(newList: $newList) {
            id
            isChecked
        }
    }
`;

// business logic separated
export const useToDoListViewModel = () => {
    const [list, setList] = useState([]);
    // const { data = [], refetch } = useQuery(listQuery, {fetchPolicy: 'network-only'});
    // const [ saveList ] = useMutation(listMutation);

    // useEffect(() => {
    //     setList(stripOutTypeName(data?.list || []));
    // }, [data])

    const addItemToList = () => setList(addItemToListLogic(list, newListItem(list.length))); 
    const removeItemFromList = (itemIndex) => setList(removeItemFromListLogic(list, itemIndex));
    const setCheckedStatus = (itemIndex, isChecked) => setList(setItemCheckedStatusLogic(list, itemIndex, isChecked));

    const triggerReload = async () => {
        // const { data } = await refetch();
        // setList(stripOutTypeName(data.list));
    };

    const memoizedAddItem = useCallback((item) => addItemToList(item), [list]);
    const memoizedRemoveItem = useCallback((itemIndex) => removeItemFromList(itemIndex), [list]);
    const memoizedSetCheckedStatus = useCallback((itemIndex, isChecked) => setCheckedStatus(itemIndex, isChecked), [list]);

    return {
        list,
        addItemToList: memoizedAddItem,
        removeItemFromList: memoizedRemoveItem,
        setCheckedStatus: memoizedSetCheckedStatus,
        triggerReload,
        // saveList,
    }
}


// // business logic coupled
// export const useToDoListViewModel = () => {
//     const [list, setList] = useState([]);
//     const { data = [], refetch } = useQuery(listQuery, {fetchPolicy: 'network-only'});
//     const [ saveList ] = useMutation(listMutation);

//     useEffect(() => {
//         setList(stripOutTypeName(data?.list || []));
//     }, [data])

//     const addItemToList = () => setList([...list, newListItem(list.length)]); 
//     const removeItemFromList = (itemIndex) => setList(list.filter((item, index) => index !== itemIndex));
//     const setCheckedStatus = (itemIndex, isChecked) => setList(list.map((item, index) =>  index === itemIndex ? {...item, isChecked }: item));

//     const triggerReload = async () => {
//         const { data } = await refetch();
//         setList(stripOutTypeName(data.list));
//     };

//     return {
//         list,
//         addItemToList,
//         removeItemFromList,
//         setCheckedStatus,
//         triggerReload,
//         saveList,
//     }
// }


// // model usage
// export const useToDoListViewModel = () => {
//     const [list, setList] = useState([]);
//     const [reload, setReload] = useState(false);

//     useEffect(() => {
//         (async () => {
//             const { data } = await loadList();
//             setList(stripOutTypeName(data?.list));
//         })();
//     }, [reload])

//     const addItemToList = () => setList(addItemToListLogic(list, newListItem(list.length))); 
//     const removeItemFromList = (itemIndex) => setList(removeItemFromListLogic(list, itemIndex));
//     const setCheckedStatus = (itemIndex, isChecked) => setList(setItemCheckedStatusLogic(list, itemIndex, isChecked));

//     const triggerReload = () => setReload((prev) => !prev);
//     const saveList = () => updateList(list);

//     return {
//         list,
//         addItemToList,
//         removeItemFromList,
//         setCheckedStatus,
//         triggerReload,
//         saveList,
//     }
// }