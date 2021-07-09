import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const currencies = [
  {
    value: '₡',
    label: '₡',
  },
  {
    value: '$',
    label: '$',
  },
  {
    value: '€',
    label: '€',
  }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

export default function CurrencyComponent({currency, setCurrency,currencyLabel}: any) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="filled-select-currency-native"
          select
          label={currencyLabel}
          value={currency}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }} 
          variant="filled"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
    </form>
  );
}
