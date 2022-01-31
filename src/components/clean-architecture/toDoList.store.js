import create from 'zustand';
import { useState } from 'react';

const defaultList = [{ id: 0, isChecked: false }, {id: 1, isChecked: true}];

// // using 3rd party state management
// export const useToDoStore = create((set) => ({
//     list: defaultList,
//     updateList: (newList) => set({list: newList}),
// }))

// using React state management
export const useToDoStore = () => {
    const [list, updateList] = useState(defaultList);

    return {
        list,
        updateList,
    }
}