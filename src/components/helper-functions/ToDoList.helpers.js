import { gql } from '@apollo/client';

export const addItemToListLogic = (list, item) => [...list, item];

export const removeItemFromListLogic = (list, itemIndex) => list.filter((item, index) => index !== itemIndex);

export const setItemCheckedStatusLogic = (list, itemIndex, isChecked) => list.map((item, index) => (index === itemIndex ? { ...item, isChecked } : item));

export const stripOutTypeName = (list) => list.map((item) => ({ id: item.id, isChecked: item.isChecked }));

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
