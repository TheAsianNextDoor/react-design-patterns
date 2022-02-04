import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';

// service
import { ToDoListService } from './ToDoList.Service.js';

// data store
import { useToDoStore } from './toDoList.store.js';

// business logic
import { useToDoListModel } from './ToDoList.Controller.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function CleanToDoList() {
  const classes = useStyles();

  const ToDoStore = useToDoStore();

  useEffect(() => {
    (async () => {
      const { data } = await ToDoListService.loadList();
      ToDoStore.setList(data?.list);
    })();
  }, []);

  const {
    list,
    addItemToList,
    removeItemFromList,
    setCheckedStatus,
    triggerReload,
    saveList,
  } = useToDoListModel(ToDoStore, ToDoListService);

  return (
    <>
      <Button onClick={addItemToList}> Add Item </Button>
      <Button onClick={triggerReload}>Trigger reload</Button>
      <Button onClick={() => saveList(list)}>Save list</Button>

      <List className={classes.root}>
        {list?.map((item, index) => (
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
