import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddButton from '@material-ui/icons/Add';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, FormControlLabel } from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

export default function InputMultiItem({ itemList, setItemList,iconList,controlLabel, inputLabel,itemName,controlName}: any) {
  const { t } = useTranslation();

  const inputRef = useRef<any>(null);
  const endAdornment = <InputAdornment position="end">
    <IconButton
      aria-label="add New Item"
      color="primary"
      onClick={() => {
        if (inputRef.current.value) {
          const data = [...itemList]
          data.push({
            [itemName]: inputRef.current.value,
            [controlName]: true
          })
          setItemList(data)
        }
      }
      }
    >
      <AddButton />
    </IconButton>
  </InputAdornment>


  return (
    <>
      <TextField
        type={"text"}
        InputProps={{
          endAdornment
        }}
        inputRef={inputRef}
        fullWidth={true}
        label={t(inputLabel)}
        variant="filled"
      />


      <List dense={true}>
        {itemList && itemList.map((newItem:any) => {
          return <ListItem>
            <ListItemAvatar>
              <Avatar>
                {iconList}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={newItem[itemName]}
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={<Switch
                  color="primary" checked={newItem[controlName]} onChange={(event) => {
                    
                    const data = [...itemList] 
                    let item = data.findIndex(x => x[itemName] === event.target.name);
                    data[item][controlName] = event.target.checked
                    setItemList(data)
                  }}  name={newItem[itemName]} />}
                label={controlLabel}
              />
              <IconButton edge="end" aria-label="delete" id={newItem[itemName]}
                onClick={(event) => {
                  let data = [...itemList] 
                  data = data.filter(x => x[itemName] !== event.currentTarget.id);
                  setItemList(data)
                }} 
                >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        })}
      </List>
    </>
  );
}
