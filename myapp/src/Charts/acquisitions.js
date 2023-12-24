import React, { useRef, useEffect, useContext } from 'react';
import Chart from 'chart.js/auto';
import { CaseHistoryContext } from '../Context/CaseHistoryContext';

const TotalCasesChart = () => {
    const chartRef = useRef(null);
    const { caseget, futureCaseGet } = useContext(CaseHistoryContext); // Assuming you have futureCaseGet for future data

    useEffect(() => {
        // Calculate the total cases
        const totalCases = caseget.length;
        // Calculate the future cases
        const futureCases = caseget.length; // Adjust this based on how you calculate or fetch future data

        const chartInstance = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: ['Total Cases', 'Today cases'], // Added 'Future Projections' label
                datasets: [
                    {
                        label: 'Current Cases',
                        data: [totalCases, null], // No future data for current cases
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                        borderWidth: 1
                    },
                    {
                        label: 'Future Cases',
                        data: [null, futureCases], // No current data for future cases
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            chartInstance.destroy();
        };
    }, [caseget, futureCaseGet]); // Include futureCaseGet in dependencies

    return (
        <>
            <div style={{ height: '300px', position: 'relative', width: "1200px", left: '50%', transform: 'translateX(-50%)' }}>
                <canvas ref={chartRef} />
            </div>
        </>
    );
};

export default TotalCasesChart;
