import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
    dataField: 'id',
    text: 'Product ID',
    sort: true
}, {
    dataField: 'name',
    text: 'Product Name',
    sort: true
}, {
    dataField: 'price',
    text: 'Product Price'
}];

const productsGenerator = (quantity = 5, callback) => {
    if (callback) return Array.from({ length: quantity }, callback);

    // if no given callback, retrun default product format.
    return (
        Array.from({ length: quantity }, (value, index) => ({
            id: index,
            name: `Item name ${index}`,
            price: 2100 + index
        }))
    );
};

const CustomisedEditableTable = (props) => (
    <BootstrapTable keyField='id' data={ productsGenerator() } columns={ columns } />
)

export default CustomisedEditableTable;
