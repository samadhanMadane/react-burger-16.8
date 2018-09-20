import React from 'react';
import ReactTable from 'react-table';
import './react-table.global.css';

const table = (props) => {
    return (
        <ReactTable 
            data={props.data} 
            columns={props.columns} 
            className= '-striped -highlight' 
            defaultPageSize= {props.pageSize} 
            getTrProps={props.onRowClick}/>
    );
}

export default table;