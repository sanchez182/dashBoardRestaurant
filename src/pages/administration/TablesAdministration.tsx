import { useEffect, FC, useState } from "react";
import {
  Paper,
  Avatar,
  CardContent,
  Grid,
  CardHeader,
  Button,
  Icon,
  Card,
  IconButton,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrUpdateTable,
  getTableData,
} from "../../actionsApi/tableActions";
import DeckIcon from "@material-ui/icons/Deck";
import DeleteIcon from "@material-ui/icons/Delete";
import { RootState } from "../../store";
import { COMPONENTSTYPE } from "../../components/EnumsComponents";
import SharedForm from "../../components/SharedForm";
import { ITableModel } from "../../store/actions/actionsInterfaces/ITableActions";
import Cloury from "./CloudinayComponent";
 


const TablesAdministration: FC = () => {
  const dispatch = useDispatch();
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
      state: "",
    });

    setState(tables);
  };

  const deleteItem = (table: any) => {
    if (!table._id) {
      let tables = [...state];
      tables = tables.filter((x: any) => x.tableNumber !== table.tableNumber);
      setState(tables);
    }
    
  }
  const createModel = (data: any, itemState: any, idElement: string) => {
    const model = {
      _id: idElement,
      tableNumber: 1,
      selected: data.available,
      type: data.tableType,
      state: "",
    };
    ;
  };

  const inputs = [
    {
      name: "tableType",
      label: "labels.tableAdministration.tableType",
      componentName: COMPONENTSTYPE.select,
      rules: {
        required: "labels.restaurantInfo.fieldError",
      },
      options: [
        {
          id: 1,
          label: "VIP",
        },
        {
          id: 2,
          label: "Standar",
        },
      ],
    },
    {
      name: "available",
      label: "labels.tableAdministration.available",
      componentName: COMPONENTSTYPE.select,
      options: [
        {
          id: 1,
          label: "Disponible",
        },
        {
          id: 2,
          label: "Ocupada",
        },
      ],
      rules: {
        required: "labels.restaurantInfo.fieldError",
      },
    },
  ];

  return (
    <Grid container >
      <Grid item xs={12} md={12} spacing={3}>
        <Button variant="contained" color="primary" onClick={addNewTable}>
          Agregar nueva mesa
        </Button>
      </Grid>
 {/*      <Cloury/> */}
       {state.length > 0 &&
        state.map((element: ITableModel) => {
          return (
            <Card
              elevation={3}
            >
              <CardHeader
                title={
                  <h3 >
                    Mesa # {element.tableNumber}
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
                    color="secondary"
                  />
                </Icon>
                <Grid item xs={12}>
                  <SharedForm
                    idElement={element._id}
                    fullWidthForm={true}
                    createModel={createModel}
                    actionSubmit={createOrUpdateTable}
                    inputs={inputs}
                    haveMoneyInputs={false}
                  />
                </Grid>

              </CardContent>
            </Card>
          );
        })} 
    </Grid>
  );
};

export default TablesAdministration;
