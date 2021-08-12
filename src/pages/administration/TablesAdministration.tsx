import { useEffect, FC, useState } from "react";
import {
  CardContent,
  Grid,
  CardHeader,
  Button,
  Icon,
  Card,
  IconButton,
  CardActions,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateTable,
  getTableData, deleteTable
} from "../../actionsApi/tableActions";
import DeckIcon from "@material-ui/icons/Deck";
import DeleteIcon from "@material-ui/icons/Delete";
import { RootState } from "../../store";
import { COMPONENTSTYPE } from "../../components/EnumsComponents";
import SharedForm from "../../components/SharedForm";
import { ITableModel } from "../../store/actions/actionsInterfaces/ITableActions";
import { useTranslation } from 'react-i18next';

const tableTypeOptions = [
  {
    id: 1,
    label: "VIP",
  },
  {
    id: 2,
    label: "Standar",
  },
]

const TablesAdministration: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tableList: ITableModel[] = useSelector(
    (state: RootState) => state.tablesData
  );
  const [state, setState] = useState<ITableModel[]>([]);

  ;
  useEffect(() => {
    dispatch(getTableData());
  }, [dispatch]);

  useEffect(() => {
    setState(tableList);
  }, [tableList]);

  const addNewTable = () => {
    const tables = [...state];
    tables.push({
      _id: null,
      tableNumber: state[state.length - 1].tableNumber + 1,
      selected: false,
      type: "",
    });

    setState(tables);
  };

  const availableOptions = [
    {
      id: 1,
      label: t("labels.tableAdministration.available")
    },
    {
      id: 2,
      label: t("labels.tableAdministration.notAvailable")
    },
  ]

  const deleteItem = (table: ITableModel) => {
    if (!table._id) {
      deleteItemFromState(table.tableNumber)
    } else {
      deleteTable(table._id).then(() => {
        deleteItemFromState(table.tableNumber)
      })
    }
  }

  const deleteItemFromState = (tableNumber: number) => {
    let tables = [...state];
    tables = tables.filter((x: ITableModel) => x.tableNumber !== tableNumber);
    setState(tables);
  }

  const createModel = async (data: { available: number, tableType: number }, itemState: any, idElement: string) => {
    return {
      _id: idElement,
      tableNumber: state.find((x: ITableModel) => x._id === idElement)?.tableNumber,
      selected: data.available === 1 ? false : true,
      type: tableTypeOptions.find((x: { id: number, label: string }) => x.id === data.tableType)?.label,
    };
    ;
  };

  const renderInputs = (table: ITableModel) => {
    return [
      {
        name: "tableType",
        label: "labels.tableAdministration.tableType",
        componentName: COMPONENTSTYPE.select,
        defaultValue: table.type === "VIP" ? 1 : 2,
        rules: {
          required: "labels.restaurantInfo.fieldError",
        },
        options: tableTypeOptions,
      },
      {
        name: "available",
        label: "labels.tableAdministration.available",
        componentName: COMPONENTSTYPE.select,
        defaultValue: table.selected ? 2 : 1,
        options: availableOptions,
        rules: {
          required: "labels.restaurantInfo.fieldError",
        },
      },
    ];

  }

  return (
    <Grid container >
      <Grid item xs={12} md={12} spacing={3}>
        <Button variant="contained" color="primary" onClick={addNewTable}>
          {t("labels.tableAdministration.addNewTable")}
        </Button>
      </Grid>

      {state.length > 0 &&
        state.map((element: ITableModel) => {
          return (
            <Card key={element.tableNumber}
              elevation={3}
              style={{
                marginRight: "6px",
                marginBottom: "6px"
              }}
            >
              <CardHeader
                title={
                  <h3 >
                    {t("labels.tableAdministration.table")} # {element.tableNumber}
                  </h3>
                }
                action={
                  <IconButton aria-label="settings" onClick={() => deleteItem(element)}>
                    <DeleteIcon fontSize={"inherit"} color={"error"} />
                  </IconButton>
                }
              />
              <CardContent
              >
                <Icon>
                  <DeckIcon
                    style={{ fontSize: "9.71875rem", marginLeft: "26%" }}
                    color={element.selected ? "secondary" : "primary"}
                  />
                </Icon>
                <Grid item xs={12}>
                  <SharedForm
                    idElement={element._id}
                    fullWidthForm={true}
                    createModel={createModel}
                    actionSubmit={createOrUpdateTable}
                    inputs={renderInputs(element)}
                    haveMoneyInputs={false}
                  />
                </Grid>

              </CardContent>
              <CardActions style={{justifyContent:"center"}}>
                        <Button variant="contained"  color="primary">
                            Cancelar Orden
                        </Button> 
                    </CardActions>
            </Card>
          );
        })}
    </Grid>
  );
};

export default TablesAdministration;
