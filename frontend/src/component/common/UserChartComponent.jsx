import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const UserChartComponent = ({ userChart }) => {
    const { totalUser, totalLibrarian, totalMember } = userChart;

    const data = {
        labels: ['Thủ thư', 'Thành viên'],
        datasets: [
            {
                data: [totalLibrarian, totalMember],
                backgroundColor: ['#007bff', '#28a745'],
                hoverBackgroundColor: ['#0056b3', '#1e7e34']
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%'
    };

    return (
        <div
            className='d-block'
            style={{
                width: '30%'
            }}
        >
            <h6>Người dùng</h6>
            <div
                className="user-chart-component"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '5px',
                    padding: '10px',
                    marginRight: '20px'
                }}
            >
                <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                    <Doughnut data={data} options={options} />
                </div>
                <div style={{ marginLeft: '10px', paddingTop: '50px' }}>
                    <div style={{ fontSize: 'small' }}>Tổng người dùng: {totalUser}</div>
                    <div style={{ fontSize: 'small' }}>Thủ thư: {totalLibrarian}</div>
                    <div style={{ fontSize: 'small' }}>Thành viên: {totalMember}</div>
                </div>
            </div>
        </div>
    );
};

export default UserChartComponent;
