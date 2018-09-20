import React from 'react';
import { Pie } from 'react-chartjs-2';

const pieChart = (props) => {
        return (
                <Pie
                    data={props.pData}
                    options={{
                        title: {
                            display: true,
                            text: props.title,
                            fontSize: 16
                        },
                        maintainAspectRatio: false,
                        legend: {
                            position: "right"
                        }
                    }}
                    width={500}
                    height={250}
                />
        );
}

export default pieChart;