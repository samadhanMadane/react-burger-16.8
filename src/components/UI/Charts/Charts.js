import React from 'react';
import classes from './Charts.css';

// import BarChart from './Chart/BarChart';
import PieChart from './Chart/PieChart';
import DoughnutChart from './Chart/DoughnutChart';
import LineChart from './Chart/LineChart';

const charts = (props) => {
        return (
            <div className={classes.Chart}>
                    {/* <BarChart bData={props.bData} title={props.bTitle}/> */}
                    <LineChart lData={props.lData} title={props.lTitle}/>
                    <PieChart pData={props.pData} title={props.pTitle}/>
                    <DoughnutChart dData={props.dData} title={props.dTitle}/>
            </div>
        );
}

export default charts;