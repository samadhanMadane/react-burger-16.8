import React from 'react';
import { Bar } from 'react-chartjs-2';

const barChart = (props) => {
        return (
                <Bar
                    data={props.bData}
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

export default barChart;