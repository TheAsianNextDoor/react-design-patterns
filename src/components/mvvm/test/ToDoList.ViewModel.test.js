
import { useToDoListViewModel } from '../ToDoList.ViewModel.js';
import assert from 'assert';
import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { listQuery } from '../ToDoList.Model.js';
import React from 'react';

const toDoListViewMock = {
  request: {
    query: listQuery,
  },
  result: {
    data: {
      list: []
    }
  }
};

const getHookWrapper = (mocks = []) => {
  const wrapper = ({children}) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );

  const { result, waitForNextUpdate } = renderHook(() => useToDoListViewModel(), { wrapper });
  
  return { result, waitForNextUpdate} ;
}

it('addItem', () => {
    const { result } = getHookWrapper([toDoListViewMock]);

    act(() => {
        result.current.addItemToList();
    })

    const expected = [
      {
          id: 0,
          isChecked: false
      }
    ]

    assert.deepEqual(result.current.list, expected)
})