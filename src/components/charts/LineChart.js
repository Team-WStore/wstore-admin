import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const LineChart = (props) => {

    const { label = "", scores = [10, 15 , 25], labels = ['Enero', 'Febrero', 'Marzo'] } = props;

    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: label,
                    data: scores,
                    tension: 0.3,
                    borderColor: "rgb(75, 192, 192)",
                    pointRadius: 6,
                    pointBackgroundColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.3)",
                }
            ],
            labels
        };
    }, []);

    const options = {
        fill: true,
        responsive: true,
        scales: {
            y: {
                min: 0,
            },
        },
    };

    return (
        <Line data={data} options={options} />
    );
}

export default LineChart;