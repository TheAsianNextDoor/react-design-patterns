
import { useToDoListViewModel } from '../ToDoList.ViewModel.js';
import assert from 'assert';
import { renderHook, act } from '@testing-library/react-hooks';

it('addItem', () => {
    const { result } = renderHook(() => useToDoListViewModel());

    act(() => {
        result.current.addItem(1);
    })

    const expected = [
        {
            id: 0,
            isChecked: false
          },
          {
            id: 1,
            isChecked: true
          },
          1
    ]

    assert.deepEqual(result.current.list, expected)
})