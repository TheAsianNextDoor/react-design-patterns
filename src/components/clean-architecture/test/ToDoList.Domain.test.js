import assert from 'assert';
import {
  addItemToList,
  removeItemFromList,
  setItemCheckedStatus,
  stripOutTypeName,
} from '../ToDoList.Domain.js';

it('addItemToList', () => {
  const actual = addItemToList([]);
  assert.deepEqual(actual, [{ id: 0, isChecked: false }]);
});

it('removeItemFromList', () => {
  const actual = removeItemFromList([{ id: 0, isChecked: false }], 0);
  assert.deepEqual(actual, []);
});

it('setItemCheckedStatus', () => {
  const actual = setItemCheckedStatus([{ id: 0, isChecked: false }], 0, true);
  assert.deepEqual(actual, [{ id: 0, isChecked: true }]);
});

it('stripOutTypeName', () => {
  const actual = stripOutTypeName([{ id: 0, isChecked: false, type: 'fake' }]);
  assert.deepEqual(actual, [{ id: 0, isChecked: false }]);
});
