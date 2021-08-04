import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddButton from '@material-ui/icons/Add';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

export default function InputMultiControl({ itemList, setItemList, iconList, inputLabel, itemName } : any) {
  const { t } = useTranslation();
  const inputRef = useRef<any>(null);

  const endAdornment = <InputAdornment position="end">
    <IconButton
      aria-label="add New Item"
      color="primary"
      onClick={() => {
        if (inputRef.current.value) {
          const data = {...itemList}
          if (!data.list.find((x: any) => x[itemName] === inputRef.current.value)) {
            data.list.push({
              [itemName]: inputRef.current.value,
              portions: 0
            })
            data.message = ''
            data.isValid = true
            inputRef.current.value = ''
            setItemList(data)
          }
        }
      }
      }
    >
      <AddButton />
    </IconButton>
  </InputAdornment>


  const renderAddOrRemoveQuantity = (icon: any, newItem: any, ariaLabel: string) => {
    return <IconButton aria-label={ariaLabel} id={newItem[itemName]}
      onClick={(event) => {
        let data = {...itemList}
        const index = data.list.findIndex((x:any) => x[itemName] === event.currentTarget.id); 
        let quantity: number = ariaLabel === 'addQuantity' ? 1 : ( data.list[index].portions === 0  ? 0 : -1);
        data.list[index].portions = data.list[index].portions + quantity
        setItemList(data)
      }}
    >
      {icon}
    </IconButton>
  }

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
        error={itemList.required && !itemList.isValid && itemList.message !== '' }
        helperText={itemList.required && itemList.message}
      />


      <List dense={true}>
        {itemList.list && itemList.list.map((newItem: any) => {
          return <ListItem key={newItem[itemName]}>
            <ListItemAvatar>
              <Avatar>
                {iconList}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={newItem[itemName]}
            />    <ListItemText
              primary={`Portions ${newItem.portions}`}
            />
            <ListItemSecondaryAction>
              {renderAddOrRemoveQuantity(<AddButton />, newItem, "addQuantity")}
              {renderAddOrRemoveQuantity(<RemoveIcon />, newItem, "removeQuantity")}
              <IconButton edge="end" aria-label="delete" id={newItem[itemName]}
                onClick={(event) => {
                  let data = {...itemList}
                  data.list = data.list.filter((x:any) => x[itemName] !== event.currentTarget.id);
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
