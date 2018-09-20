import React from 'react';
import { Line } from 'react-chartjs-2';

const lineChart = (props) => {
        return (
                <Line
                    data={props.lData}
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

export default lineChart;