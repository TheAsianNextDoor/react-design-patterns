import create from 'zustand';
import { useEffect, useState } from 'react';

// // using 3rd party state management
// export const useToDoStore = create((set) => ({
//     list: defaultList,
//     updateList: (newList) => set({list: newList}),
// }))

// using React state management
export const useToDoStore = (service) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await service.loadList();
            setList(data?.list);
        })();
    }, []);

    return {
        list,
        setList,
    }
}