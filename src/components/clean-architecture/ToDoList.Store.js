/* eslint-disable no-unused-vars */
import create from 'zustand';
import { useEffect, useState } from 'react';
import { ToDoListService } from './ToDoList.Service.js';

// example of Interface
/**

type IToDoStore {
    list: number[]
    setList: (newList: number[]) => void
 }

 */

// using 3rd party state management
export const useToDoStore = create((set) => ({
  list: [],
  setList: (newList) => set({ list: newList }),
}));

// // using React state management
// export const useToDoStore = (service) => {
//     const [list, setList] = useState([]);

//     useEffect(() => {
//         (async () => {
//             const { data } = await service.loadList();
//             setList(data?.list);
//         })();
//     }, []);

//     return {
//         list,
//         setList,
//     }
// }
