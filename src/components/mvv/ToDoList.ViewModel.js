import { useCallback, useEffect, useState } from "react"
import { addItemToListLogic, removeItemFromListLogic, setItemCheckedStatusLogic, stripOutTypeName } from "./ToDoList.UseCase.js";
import { gql, useMutation, useQuery } from '@apollo/client';

const newListItem = (index) => ({ id: index, isChecked: false });

export const listQuery = gql`
    query getList {
        list {
            id
            isChecked
        }
    }
`;

export const listMutation = gql`
    mutation UpdateList($newList: [inputUpdateList]) {
        updateList(newList: $newList) {
            id
            isChecked
        }
    }
`;

// // business logic separated
// export const useToDoListViewModel = () => {
//     const [list, setList] = useState([]);
//     const { data = [], refetch, loading } = useQuery(listQuery, {fetchPolicy: 'network-only'});
//     const [ saveListMutation ] = useMutation(listMutation);

//     useEffect(() => {
//         setList(stripOutTypeName(data?.list || []));
//     }, [loading])

//     const addItemToList = () => setList(addItemToListLogic(list, newListItem(list.length))); 
//     const removeItemFromList = (itemIndex) => setList(removeItemFromListLogic(list, itemIndex));
//     const setCheckedStatus = (itemIndex, isChecked) => setList(setItemCheckedStatusLogic(list, itemIndex, isChecked));

//     const triggerReload = async () => {
//         const { data } = await refetch();
//         setList(stripOutTypeName(data.list));
//     };
//     const saveList = async () => saveListMutation({variables: { newList: list}});

//     return {
//         list,
//         addItemToList: useCallback((item) => addItemToList(item), [list]),
//         removeItemFromList,
//         setCheckedStatus,
//         triggerReload,
//         saveList,
//     };
// };


// business logic coupled
export const useToDoListViewModel = () => {
    const [list, setList] = useState([]);
    const { data = [], refetch, loading } = useQuery(listQuery, {fetchPolicy: 'network-only'});
    const [ saveListMutation ] = useMutation(listMutation);

    useEffect(() => {
        setList(stripOutTypeName(data?.list || []));
    }, [loading])

    const addItemToList = () => {
        setList([...list, newListItem(list.length)]); 
    };
    const removeItemFromList = (itemIndex) => setList(list.filter((item, index) => index !== itemIndex));
    const setCheckedStatus = (itemIndex, isChecked) => setList(list.map((item, index) =>  index === itemIndex ? {...item, isChecked }: item));

    const triggerReload = async () => {
        const { data } =  await refetch();
        setList(stripOutTypeName(data.list));
    };
    const saveList = async () => saveListMutation({variables: { newList: list}});


    return {
        list,
        addItemToList,
        removeItemFromList,
        setCheckedStatus,
        triggerReload,
        saveList,
    };
};
