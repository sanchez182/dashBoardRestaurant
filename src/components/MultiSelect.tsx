import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: "95%"
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);


interface ISelectItem {
    renderItems: any[];
    setItemValue: (arg0: any) => void;
    items: any[];
    idItemType: string;
    itemName: string;
    placeHolder: string;
}

export default function MultiSelect({ setItemValue, renderItems, items, idItemType, itemName, placeHolder }: ISelectItem) {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">{placeHolder}</InputLabel>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={renderItems}
                onChange={setItemValue}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected: any) => selected.map((item: any) =>
                    <Chip key={item[itemName]} label={item[itemName]} className={classes.chip} />
                )}

            >
                {items.map(item => (
                    <MenuItem key={item[idItemType]} value={item}>
                        <Checkbox
                            checked={
                                renderItems.find((option: any) => option[idItemType] === item[idItemType]) ? true : false
                            }
                        />
                        <ListItemText primary={item[itemName]} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>

    );
}


