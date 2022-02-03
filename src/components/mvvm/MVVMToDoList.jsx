import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';


// business logic 
import { useToDoListViewModel } from './ToDoList.ViewModel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export const MVVMToDoList = () => {
  const classes = useStyles();
  const {
    list,
    addItemToList,
    removeItemFromList,
    setCheckedStatus,
    triggerReload,
    saveList,
  } = useToDoListViewModel();

  return (
    <>
      <Button onClick={addItemToList}>Add Item</Button>
      <Button onClick={triggerReload}>Trigger reload</Button>
      <Button onClick={saveList}>Save list</Button> 

      <List className={classes.root}>
        {list.map((item, index) => {      
          return (
            <ListItem key={index}>
              <ListItemIcon>
                <Checkbox
                  onClick={() => setCheckedStatus(index, !item.isChecked)}
                  checked={item.isChecked}
                />
              </ListItemIcon>
              <ListItemText primary={`Line item ${item.id + 1}`} />
              <ListItemSecondaryAction>
                <DeleteIcon onClick={() => removeItemFromList(index)}/>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}