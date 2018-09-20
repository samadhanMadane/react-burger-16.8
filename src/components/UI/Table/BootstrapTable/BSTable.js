import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import './BSTable.global.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

const bsTable = (props) => {
    return (
        <BootstrapTable 
            keyField={ props.id }
            data={ props.data }
            columns={ props.columns }
            pagination={ paginationFactory() }
            striped
            hover
            condensed />
    );
}

export default bsTable;