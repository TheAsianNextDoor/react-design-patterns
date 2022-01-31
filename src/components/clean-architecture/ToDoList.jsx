import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

// data store
import { useToDoStore } from './toDoList.store';

// business logic 
import { useToDoListModel } from './ToDoList.Controller';
import { Button } from '@mui/material';


export const ToDoList = () => {
  const store = useToDoStore();

  const {
    list,
    addItemToList,
    removeItemFromList,
    setCheckedStatus,
  } = useToDoListModel(store);

  return (
    <>
      <Button onClick={() => addItemToList({ id: list.length, isChecked: false })}> Add Item </Button>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {list.map((item, index) => {
          
          return (
            <ListItem key={item.id}>
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox
                    onClick={() => setCheckedStatus(index, !item.isChecked)}
                    checked={item.isChecked}
                  />
                </ListItemIcon>
                <ListItemText primary={`Line item ${item.id + 1}`} />
              </ListItemButton>
              <DeleteIcon onClick={() => removeItemFromList(index)}/>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}