
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { verifyData } from '../inputsVerify';
import "./index.css";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import PhoneButton from '@material-ui/icons/Phone';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddButton from '@material-ui/icons/Add';



function FormInput(props) {
  const { name, label, control, errorobj, type, rules, startAdornment } = props;
  const { isError, errorMessage } = verifyData(errorobj, name, props.tranlation)

  const inputRef = useRef(null);
  const [item, setItem] = useState([])
  const endAdornment = <InputAdornment position="end">
    <IconButton
      aria-label="add New Item"
      color="primary"
      onClick={() => {
        if (inputRef.current.value) {
          const data = [...item]
          data.push(inputRef.current.value)
          setItem(data)
        }
      }}>
      <AddButton />
    </IconButton>
  </InputAdornment>


  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <>
            <TextField
              type={type}
              InputProps={{
                startAdornment,
                endAdornment
              }}
              inputRef={inputRef}
              fullWidth={true}
              label={label}
              variant="filled"
              value={value}
              onChange={onChange}
              error={isError}
              helperText={errorMessage}
            />
          </>
        )}
        rules={rules}
      />


      <List dense={true}>
        {item && item.map(newItem => {
          return <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneButton />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={newItem}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" id={newItem}
                onClick={(event) => {
                  debugger
                  let data = [...item]
                  data = data.filter(x => x !== event.currentTarget.id);
                  setItem(data)
                }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        })
        }
      </List>
    </>
  );
}

export default FormInput;
