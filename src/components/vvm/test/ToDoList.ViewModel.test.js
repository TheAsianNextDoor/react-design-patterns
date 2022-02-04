/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

import assert from 'assert';
import { renderHook, act } from '@testing-library/react-hooks';
import { cleanup } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { useToDoListViewModel, listQuery } from '../ToDoList.ViewModel.js';

const toDoListEmptyMock = {
  request: {
    query: listQuery,
  },
  result: {
    data: {
      list: [],
    },
  },
};

const toDoListPopulatedMock = {
  request: {
    query: listQuery,
  },
  result: () => ({
    data: {
      list: [
        {
          id: 0,
          isChecked: false,
        },
      ],
    },
  }),
  // newData: () => ({
  //   data: {
  //     list: [
  //       {
  //           id: 0,
  //           isChecked: false
  //       }
  //     ],
  //   },
  // }),
};

afterEach(cleanup);

const getHookWrapper = (mocks = []) => {
  const wrapper = ({ children }) => (
    <MockedProvider mocks={mocks}>
      {children}
    </MockedProvider>
  );

  return renderHook(() => useToDoListViewModel(), { wrapper });
};

it('addItemToList', () => {
  const { result } = getHookWrapper([toDoListEmptyMock]);
  act(() => {
    result.current.addItemToList();
  });

  const expected = [
    {
      id: 0,
      isChecked: false,
    },
  ];

  assert.deepEqual(result.current.list, expected);
});

it('removeItemFromList', async () => {
  const { result, waitForNextUpdate } = getHookWrapper([toDoListPopulatedMock]);

  await waitForNextUpdate();

  assert.equal(result.current.list.length, 1);

  act(() => {
    result.current.removeItemFromList(0);
  });

  assert.deepEqual(result.current.list, []);
});

it('setCheckedStatus', async () => {
  const { result, waitForNextUpdate } = getHookWrapper([toDoListPopulatedMock]);

  await waitForNextUpdate();

  act(() => {
    result.current.setCheckedStatus(0, true);
  });

  assert.deepEqual(result.current.list, [{ id: 0, isChecked: true }]);
});

it('triggerReload', async () => {
  const { result, waitForNextUpdate, rerender } = getHookWrapper([toDoListPopulatedMock]);

  await waitForNextUpdate();

  act(() => {
    result.current.addItemToList();
  });

  act(() => {
    result.current.setCheckedStatus(0, true);
  });

  const tempList = [
    { id: 0, isChecked: true },
    { id: 1, isChecked: false },
  ];

  rerender();

  assert.deepEqual(result.current.list, tempList);

  await act(async () => {
    result.current.triggerReload();
  });

  rerender();

  assert.deepEqual(result.current.list, [{ id: 0, isChecked: false }]);
});
