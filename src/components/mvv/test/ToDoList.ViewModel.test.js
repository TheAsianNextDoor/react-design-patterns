
import { useToDoListViewModel, listQuery } from '../../mvv/ToDoList.ViewModel.js';
import assert from 'assert';
import { renderHook, act } from '@testing-library/react-hooks';
import { cleanup, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { ToDoList } from '../ToDoList.jsx';

const toDoListEmptyMock = {
  request: {
    query: listQuery,
  },
  result: {
    data: {
      list: []
    }
  }
};

const toDoListPopulatedMock = {
  request: {
    query: listQuery,
  },
  result: {
    data: {
      list: [
        {
            id: 0,
            isChecked: false
        }
      ],
    },
  },
};

afterEach(cleanup)


const getHookWrapper = (mocks = []) => {
  const wrapper = ({children}) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );

  return renderHook(() => useToDoListViewModel(), { wrapper });
}

it('test', () => {
  const { container } = render(
    <MockedProvider mocks={[toDoListPopulatedMock]} addTypename={false}>
      <ToDoList/>
    </MockedProvider>
  );
  // act(() => {
  //   result.current.addItemToList();
  // });

  const expected = [
    {
        id: 0,
        isChecked: false
    }
  ];

  // assert.deepEqual(result.current.list, expected);
});


it('addItemToList', () => {
    const { result } = getHookWrapper([toDoListEmptyMock]);
    act(() => {
      result.current.addItemToList();
    });

    const expected = [
      {
          id: 0,
          isChecked: false
      }
    ];

    assert.deepEqual(result.current.list, expected);
});

it('removeItemFromList', async () => {
  const { result, waitForNextUpdate, waitFor } = getHookWrapper([toDoListPopulatedMock]);
  await waitFor(() => expect(result.current.list.length !== 0))

  // act(() => {
  //   result.current.removeItemFromList(0);
  // });

  assert.deepEqual(result.current.list, [])
});

it('setCheckedStatus', () => {
  const { result, waitForNextUpdate } = getHookWrapper([toDoListPopulatedMock]);
  act(() => {
    result.current.setCheckedStatus(0, true);
  });
  waitForNextUpdate();

  assert.deepEqual(result.current.list, [{id: 0, isChecked: true}])
});