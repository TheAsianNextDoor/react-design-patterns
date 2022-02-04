import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

import {
  addItemToListLogic,
  removeItemFromListLogic,
  setItemCheckedStatusLogic,
  stripOutTypeName,
  listMutation,
  listQuery,
} from './ToDoList.helpers.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
const newListItem = (index) => ({ id: index, isChecked: false });

export function HelperToDoList() {
  const classes = useStyles();

  const [list, setList] = useState([]);
  const { data = [], refetch, loading } = useQuery(listQuery, { fetchPolicy: 'network-only' });
  const [saveListMutation] = useMutation(listMutation);

  useEffect(() => {
    setList(stripOutTypeName(data?.list || []));
  }, [loading]);

  const addItemToList = () => setList(addItemToListLogic(list, newListItem(list.length)));
  const removeItemFromList = (itemIndex) => setList(removeItemFromListLogic(list, itemIndex));
  const setCheckedStatus = (itemIndex, isChecked) => setList(setItemCheckedStatusLogic(list, itemIndex, isChecked));

  const triggerReload = async () => {
    const { data: fetchedData } = await refetch();
    setList(stripOutTypeName(fetchedData.list));
  };
  const saveList = async () => saveListMutation({ variables: { newList: list } });

  return (
    <>
      <Button onClick={addItemToList}>Add Item</Button>
      <Button onClick={triggerReload}>Trigger reload</Button>
      <Button onClick={saveList}>Save list</Button>

      <List className={classes.root}>
        {list.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Checkbox
                onClick={() => setCheckedStatus(index, !item.isChecked)}
                checked={item.isChecked}
              />
            </ListItemIcon>
            <ListItemText primary={`Line item ${item.id + 1}`} />
            <ListItemSecondaryAction>
              <DeleteIcon onClick={() => removeItemFromList(index)} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
