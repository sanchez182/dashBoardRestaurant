import { DataGrid, GridColDef } from '@material-ui/data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'itemName', headerName: 'Item Name' },
  { field: 'cant', headerName: 'Cant' },
];

const rows = [
  { id: 1, itemName: 'Platillo 1', cant: 2 },
  { id: 2, itemName: 'Platillo 2',cant: 1 },
  { id: 3, itemName: 'sangria', cant: 3 },
  { id: 4, itemName: 'Stark', cant: 2 }
];

export default function TableComponent() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns}/>
    </div>
  );
}
