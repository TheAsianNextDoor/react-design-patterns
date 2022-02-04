import * as Domain from '../ToDoList.Domain.js';
import { addItemToListUseCase } from '../ToDoList.UseCases.js';

afterEach(jest.clearAllMocks);

jest.mock('../ToDoList.Domain.js', () => {
  const originalModule = jest.requireActual('../ToDoList.Domain.js');

  return {
    __esModule: true,
    ...originalModule,
    addItemToList: jest.fn(),
    removeItemFromList: jest.fn(),
  };
});

it('addItemToListUseCase', () => {
  const storeMock = {
    list: [],
    setList: jest.fn(),
  };

  addItemToListUseCase(storeMock);

  expect(Domain.addItemToList).toBeCalledWith([]);
  expect(storeMock.setList).toBeCalledTimes(1);
});
