import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const doughnutChart = (props) => {
        return (
                <Doughnut
                    data={props.dData}
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

export default doughnutChart;