import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './table.css'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const ItemList = ({emptyProduct,product , getItems, setProduct,setProducts,products,renderDataInDialog}) => {


    const { t } = useTranslation();
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [dialogInfo, setDialogInfo] = useState({
        isVisible: false,
        info: {}
    });
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const {loadingRequest} = useSelector(state => state.requestReducer)

    useEffect(() => {
        getItems().then(data => {
            setProducts(data)
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const editProduct = (product) => {
        setProduct({ ...product });
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProduct(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }


    const rightToolbarTemplate = () => {
        return (  <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />)
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.urlImage}
            onError={(e) => e.target.src = require("../../assets/no-Image-Placeholder.png").default} alt={rowData.image}
            style={{
                height: "120px",
                width: "120px",
                borderRadius:"12px",
            }} />
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-info" onClick={() => setDialogInfo({isVisible:true, info:rowData})} />
            </React.Fragment>
        );
    }

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
 

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} 
                selection={selectedProducts}
                loading={loadingRequest}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="plateName" header="PlateName" sortable></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
                    <Column field="foodType" header="Food Type" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
            {dialogInfo.isVisible &&
             <Dialog 
             scroll='paper'
             visible={dialogInfo.isVisible} style={{ width: '64%' }}
            header={t("plateInformation")} modal 
            onHide={()=>setDialogInfo({...dialogInfo, isVisible:false})}>
                <div className="confirmation-content">
                {dialogInfo.info && renderDataInDialog(dialogInfo.info)}
                </div>
            </Dialog>
            
            }
           
        </div>
    );
}

export default ItemList