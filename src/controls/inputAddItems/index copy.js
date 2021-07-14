
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
/* 
<input id="phone" 
type="tel" 
name="phone" 
value="+375 (__) ___-__-__" 
pattern="^\+375(\s+)?\(?(17|25|29|33|44)\)?(\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$" // phones at Belarus
required> */
  return (
    <>
    <input id="phone" 
type="tel" 
name="phone" 
value="+375 (__) ___-__-__" 
pattern="^\+375(\s+)?\(?(17|25|29|33|44)\)?(\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$" // phones at Belarus
required></input>
     
    </>
  );
}

export default FormInput;
