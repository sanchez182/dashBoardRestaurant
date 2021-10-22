
import React, { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { verifyData } from '../inputsVerify';
import "./index.css";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddButton from '@material-ui/icons/Add';



function FormInput(props) {
  const { name, label, control, errorobj,setItemState,state,placeholder,hasArrayElements, type, rules, startAdornment } = props;
  const { isError, errorMessage } = verifyData(errorobj, name, props.tranlation)
  const {arrayItemName, iconList} = hasArrayElements
  const inputRef = useRef(null);
  const endAdornment = <InputAdornment position="end">
    <IconButton
      aria-label="add New Item"
      color="primary"
      onClick={() => {
        if (!isError && inputRef.current.value) {
          const data = {...state}
          data.itemState[arrayItemName].push(inputRef.current.value)
          setItemState(data)
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
              placeholder={placeholder}
              inputRef={inputRef}
              fullWidth={true}
              label={label}
              variant="filled"
              value={ value   }
              onChange={onChange}
              error={isError}
              helperText={errorMessage}
            />
          </>
        )}
        rules={rules}
      />


      <List dense={true}>
        {state.itemState[arrayItemName] && state.itemState[arrayItemName].map(newItem => {
          return <ListItem>
            <ListItemAvatar>
              <Avatar>
                {iconList}
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
            style={{color: isError && "red"}}
              primary={newItem}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" id={newItem}
                onClick={(event) => {
                  let data = {...state} 
                  data.itemState[arrayItemName] = data.itemState[arrayItemName].filter(x => x !== event.currentTarget.id);
                  setItemState(data)
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
