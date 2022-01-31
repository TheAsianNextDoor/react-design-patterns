import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

// business logic 
import { Button } from '@mui/material';
import { useToDoListViewModel } from './ToDoList.ViewModel';


export const ToDoList = () => {
  const {
    list,
    addItem,
    removeItem,
    setCheckedStatus,
    triggerReload,
    saveList,
  } = useToDoListViewModel();

  return (
    <>
      <Button onClick={addItem}>Add Item</Button>
      <Button onClick={triggerReload}>Trigger reload</Button>

      {/* Model SaveList */}
      {/* <Button onClick={saveList}>Save list</Button> */}

      {/* UseQuery SaveList */}
      <Button onClick={() => saveList({variables: { newList: list}})}>Save list</Button>      

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {list.map((item, index) => {
          
          return (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <Checkbox
                    onClick={() => setCheckedStatus(index, !item.isChecked)}
                    checked={item.isChecked}
                  />
                </ListItemIcon>
                <ListItemText primary={`Line item ${item.id + 1}`} />
              </ListItemButton>
              <DeleteIcon onClick={() => removeItem(index)}/>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}